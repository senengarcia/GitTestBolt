'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { imageSets } from '@/lib/data/imageSets';

interface GalleryControlsProps {
  currentSetKey: string;
  onSetChange: (key: string) => void;
  onReload: (key: string) => void;
}

export default function GalleryControls({
  currentSetKey,
  onSetChange,
  onReload,
}: GalleryControlsProps) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
      <select
        value={currentSetKey}
        onChange={(e) => onSetChange(e.target.value)}
        className="px-4 py-2 rounded-lg shadow-lg bg-white border border-gray-200"
      >
        {Object.keys(imageSets).map((key) => (
          <option key={key} value={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </option>
        ))}
      </select>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onReload(currentSetKey)}
        className="bg-white"
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
}