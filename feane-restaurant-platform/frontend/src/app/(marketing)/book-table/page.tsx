// File: frontend/src/app/(marketing)/book-table/page.tsx
import { Navbar } from '../../../components/layout/Navbar';
import { BookingForm } from '../../../components/booking/BookingForm';

export default function BookTablePage() {
  return (
    <main className="min-h-screen bg-brand-dark pb-24">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 pt-32 md:px-10">
        <h1 className="font-display text-4xl italic text-white text-center">Book a Table</h1>
        <p className="mt-3 text-center text-white/60">
          Reserve your spot — no account needed, just a few details.
        </p>
        <BookingForm />
      </div>
    </main>
  );
}