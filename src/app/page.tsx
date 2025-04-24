import ImageUploader from '@/components/ImageUploader';
import ProcessingQueue from '@/components/ProcessingQueue';
import ExtractedTextDisplay from '@/components/ExtractedTextDisplay';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <section className="mb-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Image-to-Text Extractor</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Extract text from images using OCR technology. Upload up to 50 images at once.
          </p>
        </div>
        
        <ImageUploader />
      </section>
      
      <section className="mb-10">
        <ProcessingQueue />
      </section>
      
      <section>
        <ExtractedTextDisplay />
      </section>
    </div>
  );
}