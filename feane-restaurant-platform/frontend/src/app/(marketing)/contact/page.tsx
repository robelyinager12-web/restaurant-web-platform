// File: frontend/src/app/(marketing)/contact/page.tsx
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { ContactHero } from '../../../components/contact/ContactHero';
import { ContactInfo } from '../../../components/contact/ContactInfo';
import { ContactHours } from '../../../components/contact/ContactHours';
import { ContactFormSection } from '../../../components/contact/ContactFormSection';
import { ContactMap } from '../../../components/contact/ContactMap';
import { ReservationsCTA } from '../../../components/contact/ReservationsCTA';
import { PrivateEvents } from '../../../components/contact/PrivateEvents';
import { SocialMedia } from '../../../components/contact/SocialMedia';
import { ContactFAQ } from '../../../components/contact/ContactFAQ';
import { ContactFinalCTA } from '../../../components/contact/ContactFinalCTA';

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactHero />
      <ContactInfo />
      <ContactHours />
      <div id="contact-form">
        <ContactFormSection />
      </div>
      <ContactMap />
      <ReservationsCTA />
      <PrivateEvents />
      <SocialMedia />
      <ContactFAQ />
      <ContactFinalCTA />
      <Footer />
    </main>
  );
}