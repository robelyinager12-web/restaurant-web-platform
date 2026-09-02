// File: frontend/src/components/home/Gallery.tsx
import Image from 'next/image';

// Populate frontend/public/images/gallery/ with real photos and update
// these filenames — currently references files that don't exist yet.
const GALLERY_IMAGES = [
  '/images/gallery/gallery-1.jpg',
  '/images/gallery/gallery-2.jpg',
  '/images/gallery/gallery-3.jpg',
  '/images/gallery/gallery-4.jpg',
  '/images/gallery/gallery-5.jpg',
  '/images/gallery/gallery-6.jpg',
];

export function Gallery() {
  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Take a Look
          </p>
          <h2 className="mt-3 font-display text-4xl italic text-white md:text-5xl">Gallery</h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {GALLERY_IMAGES.map((src, idx) => (
            <div
              key={src}
              className={`relative overflow-hidden rounded-xl bg-white/5 ${
                idx === 0 ? 'col-span-2 row-span-2 h-[280px] md:h-[380px]' : 'h-[135px] md:h-[180px]'
              }`}
            >
              <Image
                src={src}
                alt="Feane food and restaurant photo"
                fill
                className="object-cover transition-transform hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}