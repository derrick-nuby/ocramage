// file location: src/components/ExtractedTextDisplay.tsx

'use client';

import React, { useState } from 'react';
import { useOcr } from '@/context/OcrContext';
import { Button } from '@/components/ui/button';
import { Clipboard, ZoomIn, ZoomOut } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function ExtractedTextDisplay() {
  const { images, copyText } = useOcr();
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal');

  const completedImages = images.filter(img => img.status === 'completed' && img.text);

  if (completedImages.length === 0) {
    return null;
  }

  const toggleTextSize = () => {
    setTextSize(prev => prev === 'normal' ? 'large' : 'normal');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Extracted Text</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTextSize}
        >
          {textSize === 'normal' ? (
            <>
              <ZoomIn className="h-4 w-4 mr-2" />
              Increase Size
            </>
          ) : (
            <>
              <ZoomOut className="h-4 w-4 mr-2" />
              Decrease Size
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {completedImages.map((image) => (
          <div key={image.id} className="bg-card rounded-lg shadow-sm border">
            <div className="p-4">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 shrink-0 overflow-hidden rounded">
                  <Image
                    src={image.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium truncate">
                    {image.file.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {Math.round(image.file.size / 1024)} KB
                  </p>
                  <Button
                    size="sm"
                    onClick={() => image.text && copyText(image.text)}
                    className="gap-1"
                  >
                    <Clipboard className="h-3.5 w-3.5 mr-1" />
                    Copy Text
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="bauhaus-triangle opacity-5"></div>
                <ScrollArea className="h-[200px] w-full rounded border bg-muted/30 p-4">
                  <pre
                    className={cn(
                      "font-sans whitespace-pre-wrap break-words",
                      textSize === 'large' ? 'text-lg' : 'text-sm'
                    )}
                  >
                    {image.text || "No text extracted"}
                  </pre>
                </ScrollArea>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}