import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { HowItWorks } from "@/components/home/HowItWorks";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedCollections />
        <HowItWorks />
        <GalleryPreview />
        <AboutTeaser />
        <NewsletterCTA />
      </main>
      <Footer />
    </>
  );
}
