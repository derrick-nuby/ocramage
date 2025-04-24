import Image from 'next/image';
import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <Image
        src="/images/umurava-logo.png"
        alt="Loading spinner"
        width={260}
        height={260}
        className="animate-pulse scale-100 motion-safe:animate-[zoomInOut_1.5s_ease-in-out_infinite]"
      />
    </div>
  );
} 
