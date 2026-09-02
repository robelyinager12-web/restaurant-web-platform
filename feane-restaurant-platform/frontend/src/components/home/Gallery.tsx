// File: frontend/src/components/home/Gallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

// Populate frontend/public/images/gallery/ with real, licensed photos and
// update these filenames/captions. Currently placeholder paths.
const GALLERY_IMAGES = [
  { src: '/images/gallery/gallery-1.jpg', caption: 'Margherita Pizza', large: true },
  { src: '/images/gallery/gallery-2.jpg', caption: 'Fresh Off the Grill' },
  { src: '/images/gallery/gallery-3.jpg', caption: 'Garden Fresh Toppings' },
  { src: '/images/gallery/gallery-4.jpg', caption: 'Made by Hand' },
  { src: '/images/gallery/gallery-5.jpg', caption: 'Classic Burger' },
  { src: '/images/gallery/gallery-6.jpg', caption: 'Loaded & Ready' },
];

function GalleryTile({
  image,
  onOpen,
}: {
  image: (typeof GALLERY_IMAGES)[number];
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className={`group relative w-full overflow-hidden rounded-2xl bg-white/5 text-left transition-shadow hover:shadow-2xl hover:shadow-black/40 ${
        image.large ? 'col-span-2 row-span-2 h-[280px] md:h-[380px]' : 'h-[135px] md:h-[180px]'
      }`}
    >
      <Image
        src={image.src}
        alt={image.caption}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      {/* Bottom gradient + caption, revealed on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute bottom-4 left-4 translate-y-2 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {image.caption}
      </span>
      {/* Subtle gold ring on hover for a cohesive brand touch */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 transition-colors group-hover:ring-brand-gold/50" />
    </button>
  );
}

export function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section className="relative bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Take a Look
          </p>
          <h2 className="mt-3 font-display text-4xl italic text-white md:text-5xl">Gallery</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/50">
            A closer look at what comes out of our kitchen.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {GALLERY_IMAGES.map((image) => (
            <GalleryTile key={image.src} image={image} onOpen={() => setLightbox(image.src)} />
          ))}
        </div>
      </div>

      {/* Simple lightbox: click any tile to view it full-size */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/90 p-6"
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-6 top-6 text-white/70 hover:text-white"
          >
            <X size={28} />
          </button>
          <div className="relative h-[80vh] w-full max-w-4xl">
            <Image src={lightbox} alt="Gallery image enlarged" fill className="object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}