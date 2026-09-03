// File: frontend/src/components/contact/ContactHours.tsx
const HOURS = [
  { day: 'Monday – Friday', time: '10:00 AM – 10:00 PM' },
  { day: 'Saturday', time: '10:00 AM – 11:30 PM' },
  { day: 'Sunday', time: '11:00 AM – 9:00 PM' },
];

export function ContactHours() {
  return (
    <section className="bg-brand-dark py-16">
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            When We&apos;re Open
          </p>
          <h2 className="mt-3 font-display text-3xl italic text-white">Opening Hours</h2>
        </div>

        <div className="mt-8 divide-y divide-white/10 rounded-2xl bg-white/5 px-6">
          {HOURS.map((row) => (
            <div key={row.day} className="flex items-center justify-between py-4">
              <span className="text-sm text-white/70">{row.day}</span>
              <span className="text-sm font-semibold text-brand-gold">{row.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}