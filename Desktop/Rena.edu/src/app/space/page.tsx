import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function SpacePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF9F7]">
        {/* Hero Section */}
        <section className="py-24 px-4 border-b border-[#E8E6E3] bg-[#f7f4f1]">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-serif font-semibold text-[#2B2B2B] mb-6 leading-tight">
              A Central, Licensed Classroom for Versatile Learning
            </h1>
            <p className="text-xl text-[#2B2B2B]/80 leading-relaxed">
              Located in the heart of the city, designed for professional education use.
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
              <Image
                src="/space hero.png"
                alt="Space hero"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* The Environment */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-medium text-[#2B2B2B] mb-8">
              The Environment
            </h2>
            <div className="bg-white p-10 rounded-2xl border border-[#E8E6E3]">
              <p className="text-xl text-[#2B2B2B]/80 mb-8 leading-relaxed">
                A calm, focused classroom built for real teaching.
              </p>
              <ul className="space-y-4 mb-8 text-[#2B2B2B]/70 leading-relaxed">
                <li>• Licensed and compliant for education use</li>
                <li>• Fully furnished and equipped</li>
                <li>• Simple setup, no logistics to manage</li>
                <li>• One class at a time — no noise overlap</li>
              </ul>
              <p className="text-xl text-[#2B2B2B]/80 leading-relaxed">
                You arrive, teach, and leave. We handle the rest.
              </p>
            </div>
          </div>
        </section>

        {/* The Location */}
        <section className="py-20 px-4 border-t border-[#E8E6E3]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-medium text-[#2B2B2B] mb-8">
              A Central Address for a Different Audience
            </h2>
            <div className="bg-white rounded-2xl border border-[#E8E6E3] overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative w-full h-full min-h-[400px]">
                  <Image
                    src="/building.png"
                    alt="Building exterior"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-10">
                  <p className="text-lg text-[#2B2B2B]/80 mb-6 leading-relaxed">
                    The space is located in the heart of the city, within a high-quality commercial building designed for professional use.
                  </p>
                  <p className="text-lg text-[#2B2B2B]/80 mb-4 leading-relaxed">
                    Being centrally located means your classes are:
                  </p>
                  <ul className="space-y-3 mb-6 text-[#2B2B2B]/70 leading-relaxed">
                    <li>• Easy to reach for students across the city</li>
                    <li>• Close to transport, offices, and daily amenities</li>
                    <li>• Suitable for working professionals and adult learners</li>
                    <li>• Positioned as a premium, intentional learning experience</li>
                  </ul>
                  <p className="text-lg text-[#2B2B2B]/80 leading-relaxed">
                    This is not a casual or hidden venue. The location itself signals credibility, structure, and commitment to learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Access Options */}
        <section className="py-20 px-4 border-t border-[#E8E6E3]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl font-serif font-medium text-[#2B2B2B] mb-4">
                Priced by How You Use the Space
              </h2>
              <p className="text-xl text-[#2B2B2B]/80 leading-relaxed">
                We price access based on predictability and commitment.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Flexible Access */}
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] hover:border-[#2B2B2B]/20 transition-colors">
                <div className="mb-4">
                  <svg className="w-10 h-10 text-[#FF7A5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-medium text-[#2B2B2B] mb-3">
                  Flexible Access
                </h3>
                <p className="text-[#2B2B2B]/70 font-medium mb-4">For ad-hoc or short-term use</p>
                <ul className="space-y-2 mb-6 text-[#2B2B2B]/70 leading-relaxed">
                  <li>• Bookable by the hour</li>
                  <li>• No fixed weekly commitment</li>
                  <li>• Maximum flexibility</li>
                  <li>• Premium rate</li>
                </ul>
                <p className="text-[#2B2B2B]/60 italic text-sm leading-relaxed">
                  Typically used by: new instructors, one-off workshops, pilot classes
                </p>
              </div>

              {/* Committed Access */}
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] hover:border-[#2B2B2B]/20 transition-colors">
                <div className="mb-4">
                  <svg className="w-10 h-10 text-[#FF7A5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-medium text-[#2B2B2B] mb-3">
                  Committed Access
                </h3>
                <p className="text-[#2B2B2B]/70 font-medium mb-4">For weekly or recurring classes</p>
                <ul className="space-y-2 mb-6 text-[#2B2B2B]/70 leading-relaxed">
                  <li>• Fixed weekly schedule (4+ hours per week)</li>
                  <li>• Discounted hourly rate</li>
                  <li>• Priority for peak hours</li>
                  <li>• Minimum commitment period (min one month)</li>
                </ul>
                <p className="text-[#2B2B2B]/60 italic text-sm leading-relaxed">
                  Typically used by: professional instructors, small academies, associations
                </p>
              </div>

              {/* Resident / Anchor Access */}
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] hover:border-[#2B2B2B]/20 transition-colors">
                <div className="mb-4">
                  <svg className="w-10 h-10 text-[#FF7A5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-medium text-[#2B2B2B] mb-3">
                  Resident / Anchor Access
                </h3>
                <p className="text-[#2B2B2B]/70 font-medium mb-4">For long-term, high-consistency use</p>
                <ul className="space-y-2 mb-6 text-[#2B2B2B]/70 leading-relaxed">
                  <li>• Long-term reserved slots</li>
                  <li>• Best effective rates</li>
                  <li>• Highest scheduling priority</li>
                  <li>• Designed for stable programs (3 months+ or 12+ hours per week)</li>
                </ul>
                <p className="text-[#2B2B2B]/60 italic text-sm leading-relaxed">
                  Typically used by: established academies, certification providers, institutions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who This Space Works Best For */}
        <section className="py-20 px-4 border-t border-[#E8E6E3]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif font-medium text-[#2B2B2B] mb-12">
              Who This Space Works Best For
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] hover:border-[#2B2B2B]/20 transition-colors">
                <h3 className="text-2xl font-serif font-medium text-[#2B2B2B] mb-4">
                  Independent Instructors
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed">
                  You teach regularly and want a reliable, professional classroom — without running a facility.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] hover:border-[#2B2B2B]/20 transition-colors">
                <h3 className="text-2xl font-serif font-medium text-[#2B2B2B] mb-4">
                  Academies & Associations
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed">
                  You run structured programs and need consistency, compliance, and central access.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] hover:border-[#2B2B2B]/20 transition-colors">
                <h3 className="text-2xl font-serif font-medium text-[#2B2B2B] mb-4">
                  Institutions & Corporate Training
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed">
                  You require licensed space, clear scheduling, and predictable operations.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] hover:border-[#2B2B2B]/20 transition-colors">
                <h3 className="text-2xl font-serif font-medium text-[#2B2B2B] mb-4">
                  Short-Term Programs & Events
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed">
                  You need a ready-to-use classroom for a defined period — without long-term obligations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How Booking Works */}
        <section className="py-20 px-4 border-t border-[#E8E6E3]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif font-medium text-[#2B2B2B] mb-12">
              How Booking Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] text-center">
                <div className="text-4xl font-serif font-semibold text-[#2B2B2B] mb-4">1</div>
                <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-3">
                  Review Information Online
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed text-sm">
                  Understand how the space operates and which access option fits your use.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] text-center">
                <div className="text-4xl font-serif font-semibold text-[#2B2B2B] mb-4">2</div>
                <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-3">
                  Submit Your Request
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed text-sm">
                  Share your class details and preferred time slots.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] text-center">
                <div className="text-4xl font-serif font-semibold text-[#2B2B2B] mb-4">3</div>
                <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-3">
                  Tour & Review (if needed)
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed text-sm">
                  For recurring or long-term use, we'll walk through the space together.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] text-center">
                <div className="text-4xl font-serif font-semibold text-[#2B2B2B] mb-4">4</div>
                <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-3">
                  Confirm & Schedule
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed text-sm">
                  Once approved, your access is secured.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 border-t border-[#E8E6E3]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-medium text-[#2B2B2B] mb-8">
              Start with a Conversation
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
              <Link
                href="/book"
                className="bg-[#FF7A5C] text-white px-8 py-4 rounded-full font-medium hover:bg-[#FF7A5C]/90 transition-colors"
              >
                Submit a Class
              </Link>
            </div>
          </div>
        </section>

        {/* Closing Note */}
        <section className="py-20 px-4 border-t border-[#E8E6E3]">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-[#2B2B2B]/80 leading-relaxed">
              This space is designed for instructors who value clarity, professionalism, and predictability.
            </p>
            <p className="text-xl text-[#2B2B2B]/80 leading-relaxed mt-4">
              If that sounds like how you teach, you'll feel at home here.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

