'use client';

import React, { useState } from 'react';
import { Menu, X, FileText, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="border-b bg-background sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">OCR Extractor</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <Button variant="ghost" asChild>
              <Link href="/" className="font-medium">
                Home
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <a 
                href="https://github.com/tesseract-ocr/tesseract" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium"
              >
                Documentation
              </a>
            </Button>
          </nav>
          
          <Button variant="outline" asChild>
            <a 
              href="https://github.com/naptha/tesseract.js" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Button variant="ghost" asChild>
              <Link href="/" className="font-medium w-full justify-start">
                Home
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <a 
                href="https://github.com/tesseract-ocr/tesseract" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium w-full justify-start"
              >
                Documentation
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a 
                href="https://github.com/naptha/tesseract.js" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full justify-start"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}