// file is located at src/components/ProcessingQueue.tsx

'use client';

import React from 'react';
import { useOcr, type ImageItem } from '@/context/OcrContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Play,
  Trash2,
  X,
  AlertCircle,
  Clock,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function ProcessingQueue() {
  const {
    images,
    processingCount,
    processImages,
    removeImage,
    clearAll
  } = useOcr();

  if (images.length === 0) {
    return null;
  }

  const hasIdleImages = images.some(img => img.status === 'idle');

  const statusIcon = (status: ImageItem['status']) => {
    switch (status) {
      case 'idle':
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      case 'processing':
        return <Loader2 className="h-5 w-5 text-primary animate-spin" />;
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Image Queue ({images.length})</h2>
        <div className="flex gap-2">
          {hasIdleImages && (
            <Button
              onClick={processImages}
              disabled={processingCount >= 3}
              className="group"
            >
              <Play className="h-4 w-4 mr-2 group-hover:animate-pulse" />
              Process {processingCount > 0 ? `(${processingCount}/3 running)` : 'All'}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={clearAll}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-4">
        {images.map(image => (
          <div key={image.id} className="bauhaus-card relative">
            <div className="relative aspect-square">
              <Image
                src={image.preview}
                alt="Preview"
                fill
                className="w-full h-full object-cover rounded-t-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2 h-7 w-7 rounded-full opacity-70 hover:opacity-100"
                onClick={() => removeImage(image.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2 flex items-center">
                {statusIcon(image.status)}
                <span className="ml-2 text-sm truncate">
                  {image.file.name}
                </span>
              </div>
            </div>

            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className={cn("text-sm font-medium", {
                  "text-muted-foreground": image.status === 'idle',
                  "text-primary": image.status === 'processing',
                  "text-green-500": image.status === 'completed',
                  "text-destructive": image.status === 'error'
                })}>
                  {image.status.charAt(0).toUpperCase() + image.status.slice(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {Math.round(image.file.size / 1024)} KB
                </span>
              </div>

              {image.status === 'processing' && (
                <Progress value={image.progress} className="h-1.5" />
              )}

              {image.error && (
                <p className="text-xs text-destructive mt-1 line-clamp-2">
                  {image.error}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}