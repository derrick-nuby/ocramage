'use client';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "./theme-provider";
import { OcrProvider } from '@/context/OcrContext';

function providers({ children }: { children: React.ReactNode; }) {

  return (
    <OcrProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            fontWeight: 'medium',
            border: '1px solid #444',
          },
        }}
      />
      <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </OcrProvider>

  );
};

export default providers;