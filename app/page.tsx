'use client';

import { useState } from 'react';
import ImageGallery from '@/components/ImageGallery';
import GalleryControls from '@/components/GalleryControls';
import { imageSets } from '@/lib/data/imageSets';

export default function Home() {
  const [currentSetKey, setCurrentSetKey] = useState('nature');
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const handleReload = (key: string) => {
    setReloadTrigger(prev => prev + 1);
  };

  return (
    <main>
      <GalleryControls
        currentSetKey={currentSetKey}
        onSetChange={setCurrentSetKey}
        onReload={handleReload}
      />
      <ImageGallery
        key={`${currentSetKey}-${reloadTrigger}`}
        imageSet={imageSets[currentSetKey]}
        rotationInterval={5000}
        fadeTransitionDuration={1000}
      />
    </main>
  );
}