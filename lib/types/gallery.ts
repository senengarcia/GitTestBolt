export interface ImageSet {
  cornerImages: string[];
  backgroundImages: string[];
}

export interface ImageSets {
  [key: string]: ImageSet;
}