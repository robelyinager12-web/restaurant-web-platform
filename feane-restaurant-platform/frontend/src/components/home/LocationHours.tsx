// File: frontend/src/components/home/LocationHours.tsx
import { MapPin, Phone, Mail } from 'lucide-react';

const HOURS = [
  { day: 'Monday – Thursday', time: '10:00 AM – 10:00 PM' },
  { day: 'Friday – Saturday', time: '10:00 AM – 11:30 PM' },
  { day: 'Sunday', time: '11:00 AM – 9:00 PM' },
];

export function LocationHours() {
  return (
    <section className="bg-black/20 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:px-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Find Us
          </p>
          <h2 className="mt-3 font-display text-4xl italic text-white">Location</h2>

          <div className="mt-8 space-y-4 text-sm text-white/70">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 text-brand-gold" />
              <span>Injibara, Amhara Region, Ethiopia</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-brand-gold" />
              <span>+251 00 000 0000</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-brand-gold" />
              <span>hello@feane.local</span>
            </div>
          </div>

          <div className="mt-8 aspect-video overflow-hidden rounded-2xl bg-white/5">
            {/* Replace src with a real Google Maps embed URL for your location */}
            <iframe
              title="Feane location map"
              src="https://www.google.com/maps?q=Injibara%2C+Ethiopia&output=embed"
              className="h-full w-full border-0 grayscale invert"
              loading="lazy"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            When We're Open
          </p>
          <h2 className="mt-3 font-display text-4xl italic text-white">Opening Hours</h2>

          <div className="mt-8 divide-y divide-white/10 rounded-2xl bg-white/5 px-6">
            {HOURS.map((row) => (
              <div key={row.day} className="flex items-center justify-between py-4">
                <span className="text-sm text-white/70">{row.day}</span>
                <span className="text-sm font-semibold text-brand-gold">{row.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}