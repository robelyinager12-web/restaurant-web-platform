// File: frontend/src/components/about/MissionVision.tsx
import { Target, Telescope } from 'lucide-react';

export function MissionVision() {
  return (
    <section className="bg-black/20 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-2 md:px-10">
        <div className="rounded-2xl bg-white/5 p-10">
          <Target size={28} className="text-brand-gold" />
          <h2 className="mt-5 font-display text-3xl italic text-white">Our Mission</h2>
          <p className="mt-4 leading-relaxed text-white/70">
            To create memorable dining experiences through exceptional food, warm hospitality, and
            quality ingredients — served fast, without ever cutting corners.
          </p>
        </div>

        <div className="rounded-2xl bg-white/5 p-10">
          <Telescope size={28} className="text-brand-gold" />
          <h2 className="mt-5 font-display text-3xl italic text-white">Our Vision</h2>
          <p className="mt-4 leading-relaxed text-white/70">
            To become a leading destination for modern Ethiopian and international fast-casual
            cuisine — known as much for how we treat our guests as for what we put on the plate.
          </p>
        </div>
      </div>
    </section>
  );
}