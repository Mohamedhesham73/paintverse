export interface GalleryItem {
  id: string;
  title: string;
  creator: string; // display credit only; no private data
  image: string;
  featured: boolean;
}

export const GALLERY: GalleryItem[] = [
  { id: "g1", title: "M3 on the wall", creator: "PaintVerse Studio", image: "/brand/bmw-m3-lifestyle.jpeg", featured: true },
  { id: "g2", title: "Luffy after dark", creator: "PaintVerse Studio", image: "/brand/luffy-lamp.jpeg", featured: true },
  { id: "g3", title: "GT3, graphite", creator: "PaintVerse Studio", image: "/brand/porsche-gt3-1.jpeg", featured: false },
  { id: "g4", title: "Night Fury on duty", creator: "PaintVerse Studio", image: "/brand/toothless.png", featured: false },
  { id: "g5", title: "Samurai smoke", creator: "PaintVerse Studio", image: "/brand/incense3.jpeg", featured: false },
  { id: "g6", title: "The Monkey King", creator: "PaintVerse Studio", image: "/brand/incense2.jpeg", featured: false },
  { id: "g7", title: "Bikini Bottom bucks", creator: "PaintVerse Studio", image: "/brand/sponge-visa.png", featured: false },
  { id: "g8", title: "Bubbles, painted", creator: "PaintVerse Studio", image: "/brand/blue.png", featured: false },
  { id: "g9", title: "Blank & ready", creator: "PaintVerse Studio", image: "/brand/pose-3.png", featured: false },
];
