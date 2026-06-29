import { Countdown } from "@/components/Countdown";
import { Couple } from "@/components/Couple";
import { Details } from "@/components/Details";
import { DressCode } from "@/components/DressCode";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Gift } from "@/components/Gift";
import { Guestbook } from "@/components/Guestbook";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { MapSection } from "@/components/MapSection";
import { RsvpSection } from "@/components/RsvpSection";
import { SectionWave } from "@/components/SectionWave";
import { Story } from "@/components/Story";
import { VisitTracker } from "@/components/VisitTracker";
import { getSiteContent } from "@/lib/content/get-site-content";

export default async function Home() {
  const content = await getSiteContent();
  const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <main className="overflow-x-clip">
      <Intro
        name1={content.hero.name1}
        name2={content.hero.name2}
        dateLine={content.hero.dateLine}
      />
      <VisitTracker />
      <Header content={content.header} />
      <Hero content={content.hero} />
      <Countdown content={content.countdown} />
      <Story content={content.story} />
      <Couple content={content.couple} />
      <SectionWave topColor="var(--color-sage-soft)" bottomColor="var(--color-cream)" />
      <Gallery content={content.gallery} />
      <SectionWave topColor="var(--color-cream)" bottomColor="var(--color-sage-soft)" />
      <Details content={content.details} />
      <MapSection apiKey={mapsKey} />
      <DressCode content={content.dressCode} />
      <Gift content={content.gift} />
      <RsvpSection content={content.rsvp} />
      <Guestbook content={content.guestbook} />
      <Faq content={content.faq} />
      <Footer content={content.footer} />
    </main>
  );
}
