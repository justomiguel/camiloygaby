import { Countdown } from "@/components/Countdown";
import { Couple } from "@/components/Couple";
import { Details } from "@/components/Details";
import { DressCode } from "@/components/DressCode";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Gift } from "@/components/Gift";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MapSection } from "@/components/MapSection";
import { Music } from "@/components/Music";
import { RsvpSection } from "@/components/RsvpSection";
import { Story } from "@/components/Story";

export default function Home() {
  const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <Countdown />
      <Story />
      <Couple />
      <Music />
      <Gallery />
      <Details />
      <MapSection apiKey={mapsKey} />
      <DressCode />
      <Gift />
      <RsvpSection />
      <Faq />
      <Footer />
    </main>
  );
}
