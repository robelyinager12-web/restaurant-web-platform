// File: frontend/src/components/contact/ContactFAQ.tsx
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'Do I need a reservation?',
    answer: 'Walk-ins are welcome, but booking ahead guarantees your table, especially on weekends.',
  },
  {
    question: 'Can I place a large group order online?',
    answer: 'Yes — for groups larger than 10, we recommend contacting us directly so we can prepare accordingly.',
  },
  {
    question: 'Do you offer delivery?',
    answer: 'Yes, delivery is available at checkout alongside pickup — just choose your preferred option.',
  },
  {
    question: 'Are you able to accommodate dietary restrictions?',
    answer: 'Let us know in your order notes or when booking a table, and we\'ll do our best to accommodate.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 py-5">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-medium text-white">{question}</span>
        <ChevronDown
          size={18}
          className={`text-white/40 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <p className="mt-3 text-sm leading-relaxed text-white/60">{answer}</p>}
    </div>
  );
}

export function ContactFAQ() {
  return (
    <section className="bg-brand-dark py-16">
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Common Questions
          </p>
          <h2 className="mt-3 font-display text-3xl italic text-white">FAQ</h2>
        </div>

        <div className="mt-8">
          {FAQS.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}