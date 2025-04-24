'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { createWorker } from 'tesseract.js';
import toast from 'react-hot-toast';


// Define types
export type ImageItem = {
  id: string;
  file: File;
  preview: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  text: string | null;
  error: string | null;
  progress: number;
};

type OcrContextType = {
  images: ImageItem[];
  processingCount: number;
  addImages: (files: File[]) => void;
  removeImage: (id: string) => void;
  clearAll: () => void;
  processImages: () => void;
  copyText: (text: string) => void;
};

// Create context
const OcrContext = createContext<OcrContextType | undefined>(undefined);

// Provider component
export function OcrProvider({ children }: { children: ReactNode; }) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [processingCount, setProcessingCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const MAX_IMAGES = 50;
  const MAX_CONCURRENT = 3;

  // Add new images to the queue
  const addImages = (files: File[]) => {
    const totalImages = images.length + files.length;
    const filesToProcess = files.slice(0, MAX_IMAGES - images.length);

    if (totalImages > MAX_IMAGES) {
      toast.error(`Only the first ${filesToProcess.length} images were added to stay within the 50 image limit.`);
    }

    const newImages: ImageItem[] = filesToProcess.map(file => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      status: 'idle',
      text: null,
      error: null,
      progress: 0
    }));

    setImages(prev => [...prev, ...newImages]);
    toast.success(`Added ${filesToProcess.length} image${filesToProcess.length > 1 ? 's' : ''} to queue`);
  };

  // Remove an image from the queue
  const removeImage = (id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image && image.preview) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  // Clear all images
  const clearAll = () => {
    images.forEach(image => {
      if (image.preview) {
        URL.revokeObjectURL(image.preview);
      }
    });
    setImages([]);
    setProcessingCount(0);
    setIsProcessing(false);
    toast.success('All images cleared');
  };

  // Process a single image using Tesseract.js
  const processImage = async (id: string) => {
    const currentImage = images.find(img => img.id === id);
    if (!currentImage || currentImage.status !== 'idle') return;

    setProcessingCount(prev => prev + 1);

    try {
      setImages(prev =>
        prev.map(img =>
          img.id === id ? { ...img, status: 'processing', progress: 0 } : img
        )
      );

      const worker = await createWorker('eng');

      await worker.load();

      setImages(prev =>
        prev.map(img =>
          img.id === id ? { ...img, progress: 50 } : img
        )
      );

      const { data } = await worker.recognize(currentImage.file);

      setImages(prev =>
        prev.map(img =>
          img.id === id ? {
            ...img,
            text: data.text,
            status: 'completed',
            progress: 100
          } : img
        )
      );

      await worker.terminate();

    } catch (error) {
      console.error('OCR processing error:', error);

      setImages(prev =>
        prev.map(img =>
          img.id === id ? {
            ...img,
            error: error instanceof Error ? error.message : 'Failed to process image',
            status: 'error',
            progress: 0
          } : img
        )
      );

      toast.error('Failed to extract text');
    } finally {
      setProcessingCount(prev => prev - 1);
    }
  };

  // Process all idle images
  const processImages = async () => {
    if (isProcessing) return;

    const idleImages = images.filter(img => img.status === 'idle');

    if (idleImages.length === 0) {
      toast.error('No images to process');
      return;
    }

    setIsProcessing(true);
    toast.success(`Processing ${idleImages.length} image${idleImages.length > 1 ? 's' : ''}`);

    try {
      for (let i = 0; i < idleImages.length; i += MAX_CONCURRENT) {
        const batch = idleImages.slice(i, i + MAX_CONCURRENT);
        await Promise.all(batch.map(img => processImage(img.id)));
      }

      toast.success('All images processed successfully');
    } finally {
      setIsProcessing(false);
    }
  };

  // Copy text to clipboard
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Text copied to clipboard'))
      .catch(() => toast.error('Failed to copy text'));
  };

  // Clean up object URLs when component unmounts
  React.useEffect(() => {
    return () => {
      images.forEach(image => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [images]);

  const value = {
    images,
    processingCount,
    addImages,
    removeImage,
    clearAll,
    processImages,
    copyText
  };

  return <OcrContext.Provider value={value}>{children}</OcrContext.Provider>;
}

// Custom hook to use the OCR context
export function useOcr() {
  const context = useContext(OcrContext);
  if (context === undefined) {
    throw new Error('useOcr must be used within an OcrProvider');
  }
  return context;
}