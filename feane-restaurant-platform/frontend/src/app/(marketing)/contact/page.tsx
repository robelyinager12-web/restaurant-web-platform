// File: frontend/src/app/(marketing)/contact/page.tsx
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { ContactSplit } from '../../../components/contact/ContactSplit';

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-16">
        <ContactSplit />
      </div>
      <Footer />
    </main>
  );
}