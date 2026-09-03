// File: frontend/src/components/contact/ContactFormSection.tsx
import { ContactForm } from './ContactForm';

export function ContactFormSection() {
  return (
    <section className="bg-black/20 py-16">
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Send a Message
          </p>
          <h2 className="mt-3 font-display text-3xl italic text-white">Contact Form</h2>
        </div>
        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}