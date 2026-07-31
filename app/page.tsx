import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Jornada from "@/components/sections/Jornada";
import Demo from "@/components/sections/Demo";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/ui/Footer";

const Ecossistema = dynamic(() => import("@/components/sections/Ecossistema"), { ssr: true });
const Vantagens = dynamic(() => import("@/components/sections/Vantagens"), { ssr: true });

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Jornada />
        <Demo />
        <Ecossistema />
        <Vantagens />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
