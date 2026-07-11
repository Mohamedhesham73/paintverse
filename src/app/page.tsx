import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Collections } from "@/components/home/Collections";
import { LatestDrop } from "@/components/home/LatestDrop";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Community } from "@/components/home/Community";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Collections />
        <LatestDrop />
        <HowItWorks />
        <Community />
        <AboutTeaser />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
