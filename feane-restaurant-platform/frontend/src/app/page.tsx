// File: frontend/src/app/page.tsx
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { RestaurantIntroduction } from '../components/home/RestaurantIntroduction';
import { FeaturedMenu } from '../components/home/FeaturedMenu';
import { RestaurantExperience } from '../components/home/RestaurantExperience';
import { SpecialOffers } from '../components/home/SpecialOffers';
import { ReservationSection } from '../components/home/ReservationSection';
import { Gallery } from '../components/home/Gallery';
import { CustomerReviews } from '../components/home/CustomerReviews';
import { LocationHours } from '../components/home/LocationHours';
import { Newsletter } from '../components/home/Newsletter';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <RestaurantIntroduction />
      <FeaturedMenu />
      <RestaurantExperience />
      <SpecialOffers />
      <ReservationSection />
      <Gallery />
      <CustomerReviews />
      <LocationHours />
      <Newsletter />
      <Footer />
    </main>
  );
}