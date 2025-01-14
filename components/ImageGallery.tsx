'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ImageSet } from '@/lib/types/gallery';

interface ImageGalleryProps {
  /**
   * Current image set to display
   */
  imageSet: ImageSet;
  /**
   * Time between background image rotations in milliseconds
   */
  rotationInterval?: number;
  /**
   * Duration of the fade transition in milliseconds
   */
  fadeTransitionDuration?: number;
}

export default function ImageGallery({
  imageSet,
  rotationInterval = 5000,
  fadeTransitionDuration = 1000,
}: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Reset index when image set changes
    setCurrentImageIndex(0);
  }, [imageSet]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % imageSet.backgroundImages.length
        );
        setIsTransitioning(false);
      }, fadeTransitionDuration);
      
    }, rotationInterval);

    return () => clearInterval(intervalId);
  }, [imageSet.backgroundImages.length, rotationInterval, fadeTransitionDuration]);

  if (imageSet.cornerImages.length !== 4) {
    throw new Error('Exactly 4 corner images must be provided');
  }

  return (
    <div className="relative w-full min-h-screen p-8 bg-white flex items-center justify-center">
      {/* Background Image Container */}
      <div 
        className="relative w-[80%] h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
        style={{
          transition: `opacity ${fadeTransitionDuration}ms ease-in-out`,
          opacity: isTransitioning ? 0 : 1,
        }}
      >
        <Image
          src={imageSet.backgroundImages[currentImageIndex]}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Corner Images */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left */}
        <div className="absolute top-4 left-4 w-64 h-48">
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageSet.cornerImages[0]}
              alt="Corner 1"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Top Right */}
        <div className="absolute top-4 right-4 w-64 h-48">
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageSet.cornerImages[1]}
              alt="Corner 2"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bottom Left */}
        <div className="absolute bottom-4 left-4 w-64 h-48">
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageSet.cornerImages[2]}
              alt="Corner 3"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bottom Right */}
        <div className="absolute bottom-4 right-4 w-64 h-48">
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageSet.cornerImages[3]}
              alt="Corner 4"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}