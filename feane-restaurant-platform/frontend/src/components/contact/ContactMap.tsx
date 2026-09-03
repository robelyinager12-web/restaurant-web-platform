// File: frontend/src/components/contact/ContactMap.tsx
export function ContactMap() {
  return (
    <section className="bg-brand-dark py-16">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Find Us
          </p>
          <h2 className="mt-3 font-display text-3xl italic text-white">Location</h2>
        </div>

        <div className="mt-8 aspect-video overflow-hidden rounded-2xl bg-white/5">
          {/* Replace src with your real Google Maps embed URL */}
          <iframe
            title="Feane location map"
            src="https://www.google.com/maps?q=Injibara%2C+Ethiopia&output=embed"
            className="h-full w-full border-0 grayscale invert"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}