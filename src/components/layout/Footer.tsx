'use client';

import React from 'react';
import { FileText, Github, Code2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function Footer() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <footer className="bg-muted py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="md:hidden">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex w-full justify-between">
                <span>About this application</span>
                <span>{isOpen ? '−' : '+'}</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="pt-2 pb-4 space-y-4">
                <p className="text-sm text-muted-foreground">
                  This OCR application uses Tesseract.js to extract text from images. 
                  Upload multiple images at once and get the extracted text instantly.
                </p>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href="https://github.com/naptha/tesseract.js" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 justify-start"
                    >
                      <Github className="h-4 w-4" />
                      <span>Tesseract.js</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href="https://nextjs.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 justify-start"
                    >
                      <Code2 className="h-4 w-4" />
                      <span>Next.js</span>
                    </a>
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        <div className="hidden md:flex justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-bold">OCR Extractor</span>
          </div>
          
          <div className="max-w-xs">
            <p className="text-sm text-muted-foreground">
              This OCR application uses Tesseract.js to extract text from images. 
              Upload multiple images at once and get the extracted text instantly.
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" asChild>
              <a 
                href="https://github.com/naptha/tesseract.js" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                <span>Tesseract.js</span>
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a 
                href="https://nextjs.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Code2 className="h-4 w-4" />
                <span>Next.js</span>
              </a>
            </Button>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-center items-center gap-1 text-sm text-muted-foreground">
          <span>Built with</span>
          <Heart className="h-4 w-4 text-primary" />
          <span>using Next.js and Tesseract.js</span>
        </div>
      </div>
    </footer>
  );
}