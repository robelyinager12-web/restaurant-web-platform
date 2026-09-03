// File: frontend/src/components/about/AwardsAchievements.tsx
import { Award, BadgeCheck, Clock, Users2 } from 'lucide-react';

const STATS = [
  { icon: Clock, value: '12+', label: 'Years of Experience' },
  { icon: Users2, value: '50k+', label: 'Customers Served' },
  { icon: Award, value: '3', label: 'Local Awards' },
  { icon: BadgeCheck, value: '100%', label: 'Food Safety Certified' },
];

export function AwardsAchievements() {
  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Recognition
          </p>
          <h2 className="mt-3 font-display text-4xl italic text-white md:text-5xl">
            Awards & Achievements
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <Icon size={28} className="mx-auto text-brand-gold" />
              <p className="mt-4 font-display text-3xl text-white">{value}</p>
              <p className="mt-1 text-sm text-white/50">{label}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-white/30">
          Sample figures shown — replace with your restaurant&apos;s real milestones and any actual
          awards or certifications.
        </p>
      </div>
    </section>
  );
}