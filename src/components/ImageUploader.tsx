// this file is located at src/components/ImageUploader.tsx

'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOcr } from '@/context/OcrContext';
import toast from 'react-hot-toast';

export default function ImageUploader() {
  const { addImages } = useOcr();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Filter for image files
    const imageFiles = acceptedFiles.filter(file =>
      file.type.startsWith('image/')
    );

    if (imageFiles.length < acceptedFiles.length) {
      toast.error('Some files were rejected. Only images are allowed.');
    }

    if (imageFiles.length > 0) {
      addImages(imageFiles);
    }
  }, [addImages]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']
    },
    maxSize: 10485760, // 10MB
    onDropRejected: (fileRejections) => {
      fileRejections.forEach(rejection => {
        if (rejection.errors[0].code === 'file-too-large') {
          toast.error(`File "${rejection.file.name}" is too large. Max size is 10MB.`);
        } else {
          toast.error(`File "${rejection.file.name}" was rejected: ${rejection.errors[0].message}`);
        }
      });
    }
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active border-primary' : ''} 
          ${isDragReject ? 'border-destructive' : ''} 
          ${isDragAccept ? 'border-green-500' : ''}`}
      >
        <input {...getInputProps()} />

        <div className="bauhaus-square"></div>
        <div className="bauhaus-circle"></div>

        <div className="flex flex-col items-center justify-center h-full relative z-10">
          <Upload
            className={`h-12 w-12 mb-4 ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`}
            strokeWidth={1.5}
          />

          <h3 className="text-xl font-semibold mb-2">
            {isDragActive
              ? 'Drop images here'
              : 'Drag & drop images here'}
          </h3>

          <p className="text-muted-foreground text-center mb-4">
            {isDragReject
              ? 'Some files are not allowed'
              : 'Or click to browse files'}
          </p>

          <Button
            variant="outline"
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <FileUp className="h-4 w-4 mr-2" />
            Browse Files
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const filesArray = Array.from(e.target.files);
                  onDrop(filesArray);
                  e.target.value = ''; // Reset input
                }
              }}
              multiple
              accept="image/*"
            />
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Supported formats: JPG, PNG, GIF, BMP, WEBP (max 10MB)
          </p>
        </div>
      </div>
    </div>
  );
}