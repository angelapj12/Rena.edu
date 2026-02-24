import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import RenaissanceSpirit from "@/components/RenaissanceSpirit";
import OurVision from "@/components/OurVision";
import TeachAtRenaissance from "@/components/TeachAtRenaissance";
import HowToGetStarted from "@/components/HowToGetStarted";

export default async function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-base-light">
        {/* Hero Section */}
        <HeroSection />

        {/* The Renaissance Spirit — asymmetric grid */}
        <RenaissanceSpirit />

        {/* Our Vision — dark shift, line-by-line reveal */}
        <OurVision />

        {/* Teach at Renaissance — split-screen sticky */}
        <TeachAtRenaissance />

        {/* How to Get Started — timeline + What's Next CTAs */}
        <HowToGetStarted />
      </main>
      <Footer />
    </>
  );
}
