// File: frontend/src/components/contact/ContactInfo.tsx
import { MapPin, Phone, Mail, Globe, MessageCircle } from 'lucide-react';

const INFO = [
  { icon: MapPin, label: 'Address', value: 'Injibara, Amhara Region, Ethiopia' },
  { icon: Phone, label: 'Phone', value: '+251 00 000 0000' },
  { icon: Mail, label: 'Email', value: 'hello@feane.local' },
  { icon: Globe, label: 'Website', value: 'www.feane.local' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+251 00 000 0000' },
];

export function ContactInfo() {
  return (
    <section className="bg-black/20 py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {INFO.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl bg-white/5 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                <Icon size={20} />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                {label}
              </p>
              <p className="mt-1 text-sm text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}