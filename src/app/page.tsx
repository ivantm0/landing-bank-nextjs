import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Features } from "@/components/Features";
import { CardPicker } from "@/components/CardPicker";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { Steps } from "@/components/Steps";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Signup } from "@/components/Signup";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <Stats />
        <Features />
        <CardPicker />
        <SavingsCalculator />
        <Steps />
        <Testimonials />
        <Faq />
        <Signup />
      </main>
      <Footer />
    </>
  );
}
