// File: frontend/src/app/page.tsx
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/home/Hero';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* Featured menu, about teaser, testimonials sections come next */}
    </main>
  );
}