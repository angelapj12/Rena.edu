import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function SpacePage() {
  const t = await getTranslations("space");
  const tCommon = await getTranslations("common");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF9F7]">
        {/* Hero Section */}
        <section className="py-24 px-4 border-b border-[#E8E6E3] bg-[#f7f4f1]">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-serif font-semibold text-[#2B2B2B] mb-6 leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-[#2B2B2B]/80 leading-relaxed">
              {t("hero.description")}
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
              {t("environment.title")}
            </h2>
            <div className="bg-white p-10 rounded-2xl border border-[#E8E6E3]">
              <p className="text-xl text-[#2B2B2B]/80 mb-8 leading-relaxed">
                {t("environment.intro")}
              </p>
              <ul className="space-y-4 mb-8 text-[#2B2B2B]/70 leading-relaxed">
                <li>• {t("environment.features.licensed")}</li>
                <li>• {t("environment.features.furnished")}</li>
                <li>• {t("environment.features.simple")}</li>
                <li>• {t("environment.features.exclusive")}</li>
              </ul>
              <p className="text-xl text-[#2B2B2B]/80 leading-relaxed">
                {t("environment.outro")}
              </p>
            </div>
          </div>
        </section>

        {/* The Location */}
        <section className="py-20 px-4 border-t border-[#E8E6E3]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-medium text-[#2B2B2B] mb-8">
              {t("location.title")}
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
                    {t("location.description1")}
                  </p>
                  <p className="text-lg text-[#2B2B2B]/80 mb-4 leading-relaxed">
                    {t("location.description2")}
                  </p>
                  <ul className="space-y-3 mb-6 text-[#2B2B2B]/70 leading-relaxed">
                    <li>• {t("location.benefits.accessible")}</li>
                    <li>• {t("location.benefits.transport")}</li>
                    <li>• {t("location.benefits.professional")}</li>
                    <li>• {t("location.benefits.premium")}</li>
                  </ul>
                  <p className="text-lg text-[#2B2B2B]/80 leading-relaxed">
                    {t("location.description3")}
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
                {t("pricing.title")}
              </h2>
              <p className="text-xl text-[#2B2B2B]/80 leading-relaxed">
                {t("pricing.subtitle")}
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
                  {t("pricing.options.flexible.title")}
                </h3>
                <p className="text-[#2B2B2B]/70 font-medium mb-4">{t("pricing.options.flexible.subtitle")}</p>
                <ul className="space-y-2 mb-6 text-[#2B2B2B]/70 leading-relaxed">
                  {t.raw("pricing.options.flexible.features").map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
                <p className="text-[#2B2B2B]/60 italic text-sm leading-relaxed">
                  {t("pricing.options.flexible.note")}
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
                  {t("pricing.options.committed.title")}
                </h3>
                <p className="text-[#2B2B2B]/70 font-medium mb-4">{t("pricing.options.committed.subtitle")}</p>
                <ul className="space-y-2 mb-6 text-[#2B2B2B]/70 leading-relaxed">
                  {t.raw("pricing.options.committed.features").map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
                <p className="text-[#2B2B2B]/60 italic text-sm leading-relaxed">
                  {t("pricing.options.committed.note")}
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
                  {t("pricing.options.resident.title")}
                </h3>
                <p className="text-[#2B2B2B]/70 font-medium mb-4">{t("pricing.options.resident.subtitle")}</p>
                <ul className="space-y-2 mb-6 text-[#2B2B2B]/70 leading-relaxed">
                  {t.raw("pricing.options.resident.features").map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
                <p className="text-[#2B2B2B]/60 italic text-sm leading-relaxed">
                  {t("pricing.options.resident.note")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who This Space Works Best For */}
        <section className="py-20 px-4 border-t border-[#E8E6E3]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif font-medium text-[#2B2B2B] mb-12">
              {t("audience.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] hover:border-[#2B2B2B]/20 transition-colors">
                <h3 className="text-2xl font-serif font-medium text-[#2B2B2B] mb-4">
                  {t("audience.cards.instructors.title")}
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed">
                  {t("audience.cards.instructors.description")}
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] hover:border-[#2B2B2B]/20 transition-colors">
                <h3 className="text-2xl font-serif font-medium text-[#2B2B2B] mb-4">
                  {t("audience.cards.academies.title")}
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed">
                  {t("audience.cards.academies.description")}
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] hover:border-[#2B2B2B]/20 transition-colors">
                <h3 className="text-2xl font-serif font-medium text-[#2B2B2B] mb-4">
                  {t("audience.cards.institutions.title")}
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed">
                  {t("audience.cards.institutions.description")}
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] hover:border-[#2B2B2B]/20 transition-colors">
                <h3 className="text-2xl font-serif font-medium text-[#2B2B2B] mb-4">
                  {t("audience.cards.shortTerm.title")}
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed">
                  {t("audience.cards.shortTerm.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How Booking Works */}
        <section className="py-20 px-4 border-t border-[#E8E6E3]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif font-medium text-[#2B2B2B] mb-12">
              {t("booking.title")}
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] text-center">
                <div className="text-4xl font-serif font-semibold text-[#2B2B2B] mb-4">1</div>
                <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-3">
                  {t("booking.steps.1.title")}
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed text-sm">
                  {t("booking.steps.1.description")}
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] text-center">
                <div className="text-4xl font-serif font-semibold text-[#2B2B2B] mb-4">2</div>
                <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-3">
                  {t("booking.steps.2.title")}
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed text-sm">
                  {t("booking.steps.2.description")}
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] text-center">
                <div className="text-4xl font-serif font-semibold text-[#2B2B2B] mb-4">3</div>
                <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-3">
                  {t("booking.steps.3.title")}
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed text-sm">
                  {t("booking.steps.3.description")}
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-[#E8E6E3] text-center">
                <div className="text-4xl font-serif font-semibold text-[#2B2B2B] mb-4">4</div>
                <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-3">
                  {t("booking.steps.4.title")}
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed text-sm">
                  {t("booking.steps.4.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 border-t border-[#E8E6E3]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-medium text-[#2B2B2B] mb-8">
              {t("cta.title")}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2B2B2B] text-[#FAF9F7] px-8 py-4 rounded-full font-medium hover:bg-[#2B2B2B]/90 transition-colors"
              >
                {tCommon("bookTour")}
              </a>
              <Link
                href="/book"
                className="bg-[#FF7A5C] text-white px-8 py-4 rounded-full font-medium hover:bg-[#FF7A5C]/90 transition-colors"
              >
                {tCommon("submitClass")}
              </Link>
            </div>
          </div>
        </section>

        {/* Closing Note */}
        <section className="py-20 px-4 border-t border-[#E8E6E3]">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-[#2B2B2B]/80 leading-relaxed">
              {t("closing.text1")}
            </p>
            <p className="text-xl text-[#2B2B2B]/80 leading-relaxed mt-4">
              {t("closing.text2")}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
