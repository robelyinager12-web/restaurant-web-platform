// File: frontend/src/components/contact/SocialMedia.tsx
import { Instagram, Facebook, Twitter } from 'lucide-react';

const SOCIALS = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Twitter, label: 'X (Twitter)', href: '#' },
];

export function SocialMedia() {
  return (
    <section className="bg-black/20 py-16">
      <div className="mx-auto max-w-2xl px-6 text-center md:px-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
          Follow Along
        </p>
        <h2 className="mt-3 font-display text-3xl italic text-white">Social Media</h2>

        <div className="mt-8 flex justify-center gap-6">
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            
              key={label}
              href={href}
              aria-label={label}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-brand-gold/10 hover:text-brand-gold transition"
            >
              <Icon size={22} />
            </a>
          ))}
        </div>
        <p className="mt-6 text-xs text-white/30">
          Links are placeholders — update with your real social profile URLs.
        </p>
      </div>
    </section>
  );
}