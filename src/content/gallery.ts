export interface GalleryItem {
  id: string;
  title: string;
  creator: string; // display credit only; no private data
  image: string;
  featured: boolean;
}

export const GALLERY: GalleryItem[] = [
  { id: "g1", title: "M3 on the wall", creator: "PaintVerse Studio", image: "/brand/bmw-m3-lifestyle.jpeg", featured: true },
  { id: "g2", title: "Luffy after dark", creator: "PaintVerse Studio", image: "/brand/luffy-lamp.png", featured: true },
  { id: "g3", title: "Blank & ready", creator: "PaintVerse Studio", image: "/brand/pose-3.png", featured: false },
  { id: "g4", title: "Pose study I", creator: "PaintVerse Studio", image: "/brand/pose-5.png", featured: false },
  { id: "g5", title: "Pose study II", creator: "PaintVerse Studio", image: "/brand/pose-2.png", featured: false },
  { id: "g6", title: "On the bench", creator: "PaintVerse Studio", image: "/brand/pose-7.png", featured: false },
  { id: "g7", title: "Fresh cast", creator: "PaintVerse Studio", image: "/brand/pose-4.png", featured: false },
  { id: "g8", title: "Ready to prime", creator: "PaintVerse Studio", image: "/brand/pose-6.png", featured: false },
];
