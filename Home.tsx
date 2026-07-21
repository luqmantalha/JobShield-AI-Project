import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import DashboardPreview from "../components/DashboardPreview";
import HowItWorks from "../components/HowItWorks";
import AIDemo from "../components/AIDemo";
import TrustedBy from "../components/TrustedBy";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <section id="stats">
        <Stats />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="dashboard">
        <DashboardPreview />
      </section>

      <section id="workflow">
        <HowItWorks />
      </section>

      <section id="ai-demo">
        <AIDemo />
      </section>

      <section id="technology">
        <TrustedBy />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="faq">
        <FAQ />
      </section>

      <Footer />
    </>
  );
}

export default Home;