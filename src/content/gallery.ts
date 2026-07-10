export interface GalleryItem {
  id: string;
  title: string;
  creator: string; // display credit only; no private data
  image: string;
  featured: boolean;
}

export const GALLERY: GalleryItem[] = [
  { id: "g1", title: "Emerald Mecha", creator: "Studio sample", image: "/brand/cover.png", featured: true },
  { id: "g2", title: "Midnight Chameleon", creator: "Studio sample", image: "/brand/app-icon.png", featured: false },
  { id: "g3", title: "Neon Scales", creator: "Studio sample", image: "/brand/nav-icon.png", featured: false },
];
