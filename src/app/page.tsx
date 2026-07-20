import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemStatement } from "@/components/ProblemStatement";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/CursorGlow";
import { SectionDivider } from "@/components/SectionDivider";

export default function Home() {
  return (
    <main className="noise-overlay">
      <CursorGlow />
      <Navbar />
      <Hero />
      <SectionDivider />
      <ProblemStatement />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Work />
      <SectionDivider />
      <Process />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Contact />
      <Footer />
    </main>
  );
}
