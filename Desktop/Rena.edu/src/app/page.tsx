import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF9F7]">
        {/* Hero Section */}
        <section className="py-24 px-4 bg-[#f7f4f1]">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-serif font-semibold text-[#2B2B2B] mb-3 leading-tight">
                  The perfect studio for your needs in the heart of the City
                </h1>
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#2B2B2B] mb-4 leading-tight">
                  Ready When You Are
                </h2>
                <p className="text-lg text-[#2B2B2B]/80 leading-snug">
                  A licensed, fully equipped education space designed for instructors who value predictability, credibility, and ease.
                </p>
              </div>
              <div className="relative w-full max-w-md mx-auto aspect-[5/4] rounded-3xl overflow-hidden">
                <Image
                  src="/studio.png"
                  alt="Studio space"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Marquee: How the Space Is Used */}
        <Marquee />

        {/* Use Cases Grid */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif font-medium text-[#2B2B2B] mb-12 text-center">
              An urban solution to your education needs.
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-[#E8E6E3] overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-[#2B2B2B]/10">
                <div className="relative w-full h-64">
                  <Image
                    src="/yoga studio.png"
                    alt="Yoga studio"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-2xl font-serif font-medium text-[#2B2B2B] mb-3">
                    Run a Weekly Class
                  </h3>
                  <p className="text-[#2B2B2B]/70 leading-relaxed">
                    You already have students. You need a consistent, professional space every week — without managing a lease.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#E8E6E3] overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-[#2B2B2B]/10">
                <div className="relative w-full h-64">
                  <Image
                    src="/sound therapy.png"
                    alt="Sound therapy"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-2xl font-serif font-medium text-[#2B2B2B] mb-3">
                    Test a New Course
                  </h3>
                  <p className="text-[#2B2B2B]/70 leading-relaxed">
                    Launch a pilot, gather feedback, and validate demand before committing long term.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#E8E6E3] overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-[#2B2B2B]/10">
                <div className="relative w-full h-64">
                  <Image
                    src="/corporate training.png"
                    alt="Corporate training"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-2xl font-serif font-medium text-[#2B2B2B] mb-3">
                    Host an Intensive or Workshop
                  </h3>
                  <p className="text-[#2B2B2B]/70 leading-relaxed">
                    Short-term programs, exam prep, or guest-led sessions — fully compliant and ready to use.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#E8E6E3] overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-[#2B2B2B]/10">
                <div className="relative w-full h-64">
                  <Image
                    src="/training.png"
                    alt="Professional training"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-2xl font-serif font-medium text-[#2B2B2B] mb-3">
                    Deliver Professional Training
                  </h3>
                  <p className="text-[#2B2B2B]/70 leading-relaxed">
                    For associations, academies, and organizations that require a licensed, central venue.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#E8E6E3] overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-[#2B2B2B]/10">
                <div className="relative w-full h-64">
                  <Image
                    src="/seminar.jpeg"
                    alt="Seminar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-2xl font-serif font-medium text-[#2B2B2B] mb-3">
                    Run a Hybrid Informational Seminar
                  </h3>
                  <p className="text-[#2B2B2B]/70 leading-relaxed">
                    Launch a pilot, gather feedback, and validate demand before committing long term.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#E8E6E3] overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-[#2B2B2B]/10">
                <div className="relative w-full h-64">
                  <Image
                    src="/small class.png"
                    alt="Small class"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-2xl font-serif font-medium text-[#2B2B2B] mb-3">
                    Organize a Pop-up Small Class Event
                  </h3>
                  <p className="text-[#2B2B2B]/70 leading-relaxed">
                    Launch a pilot, gather feedback, and validate demand before committing long term.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif font-medium text-[#2B2B2B] mb-12 text-center">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="text-3xl font-serif font-semibold text-[#2B2B2B] mb-4 transition-colors duration-300 hover:text-[#FF7A5C]">1</div>
                <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-2">
                  Explore the Space
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed text-sm">
                  Review our access options, pricing logic, and availability online.
                </p>
              </div>
              <div className="text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="text-3xl font-serif font-semibold text-[#2B2B2B] mb-4 transition-colors duration-300 hover:text-[#FF7A5C]">2</div>
                <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-2">
                  Submit a Class or Request
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed text-sm">
                  Tell us what you plan to teach and when you'd like to use the space.
                </p>
              </div>
              <div className="text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="text-3xl font-serif font-semibold text-[#2B2B2B] mb-4 transition-colors duration-300 hover:text-[#FF7A5C]">3</div>
                <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-2">
                  Review & Tour
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed text-sm">
                  For recurring or peak-hour use, we'll schedule a short tour and confirm fit.
                </p>
              </div>
              <div className="text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="text-3xl font-serif font-semibold text-[#2B2B2B] mb-4 transition-colors duration-300 hover:text-[#FF7A5C]">4</div>
                <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-2">
                  Get Scheduled
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed text-sm">
                  Once approved, your time is reserved — predictably and professionally.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-medium text-[#2B2B2B] mb-8">
              See if the Space Fits Your Teaching
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2B2B2B] text-[#FAF9F7] px-8 py-4 rounded-full font-medium hover:bg-[#2B2B2B]/90 transition-colors"
              >
                Book a Tour
              </a>
              <a
                href="/book"
                className="bg-[#FF7A5C] text-white px-8 py-4 rounded-full font-medium hover:bg-[#FF7A5C]/90 transition-colors"
              >
                Submit a Class
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
