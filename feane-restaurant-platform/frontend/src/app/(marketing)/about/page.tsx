// File: frontend/src/app/(marketing)/about/page.tsx
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { AboutHero } from '../../../components/about/AboutHero';
import { OurStory } from '../../../components/about/OurStory';
import { MissionVision } from '../../../components/about/MissionVision';
import { OurValues } from '../../../components/about/OurValues';
import { TeamSection } from '../../../components/about/TeamSection';
import { WhyChooseUs } from '../../../components/about/WhyChooseUs';
import { DiningExperience } from '../../../components/about/DiningExperience';
import { AwardsAchievements } from '../../../components/about/AwardsAchievements';
import { AboutTestimonials } from '../../../components/about/AboutTestimonials';
import { FinalCTA } from '../../../components/about/FinalCTA';

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <OurStory />
      <MissionVision />
      <OurValues />
      <TeamSection />
      <WhyChooseUs />
      <DiningExperience />
      <AwardsAchievements />
      <AboutTestimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}