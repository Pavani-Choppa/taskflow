import Header from "../../components/layout/Header";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/layout/Footer";

export default function Landing() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
