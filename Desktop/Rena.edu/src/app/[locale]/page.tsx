import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function Home() {
  const t = await getTranslations("homepage");
  const tCommon = await getTranslations("common");

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
                  {t("hero.title")}
                </h1>
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#2B2B2B] mb-4 leading-tight">
                  {t("hero.subtitle")}
                </h2>
                <p className="text-lg text-[#2B2B2B]/80 leading-snug">
                  {t("hero.description")}
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
              {t("useCases.title")}
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
                    {t("useCases.cards.weeklyClass.title")}
                  </h3>
                  <p className="text-[#2B2B2B]/70 leading-relaxed">
                    {t("useCases.cards.weeklyClass.description")}
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
                    {t("useCases.cards.testCourse.title")}
                  </h3>
                  <p className="text-[#2B2B2B]/70 leading-relaxed">
                    {t("useCases.cards.testCourse.description")}
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
                    {t("useCases.cards.intensive.title")}
                  </h3>
                  <p className="text-[#2B2B2B]/70 leading-relaxed">
                    {t("useCases.cards.intensive.description")}
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
                    {t("useCases.cards.professionalTraining.title")}
                  </h3>
                  <p className="text-[#2B2B2B]/70 leading-relaxed">
                    {t("useCases.cards.professionalTraining.description")}
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
                    {t("useCases.cards.seminar.title")}
                  </h3>
                  <p className="text-[#2B2B2B]/70 leading-relaxed">
                    {t("useCases.cards.seminar.description")}
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
                    {t("useCases.cards.popupClass.title")}
                  </h3>
                  <p className="text-[#2B2B2B]/70 leading-relaxed">
                    {t("useCases.cards.popupClass.description")}
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
              {t("howItWorks.title")}
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="text-3xl font-serif font-semibold text-[#2B2B2B] mb-4 transition-colors duration-300 hover:text-[#FF7A5C]">1</div>
                <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-2">
                  {t("howItWorks.steps.1.title")}
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed text-sm">
                  {t("howItWorks.steps.1.description")}
                </p>
              </div>
              <div className="text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="text-3xl font-serif font-semibold text-[#2B2B2B] mb-4 transition-colors duration-300 hover:text-[#FF7A5C]">2</div>
                <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-2">
                  {t("howItWorks.steps.2.title")}
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed text-sm">
                  {t("howItWorks.steps.2.description")}
                </p>
              </div>
              <div className="text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="text-3xl font-serif font-semibold text-[#2B2B2B] mb-4 transition-colors duration-300 hover:text-[#FF7A5C]">3</div>
                <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-2">
                  {t("howItWorks.steps.3.title")}
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed text-sm">
                  {t("howItWorks.steps.3.description")}
                </p>
              </div>
              <div className="text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="text-3xl font-serif font-semibold text-[#2B2B2B] mb-4 transition-colors duration-300 hover:text-[#FF7A5C]">4</div>
                <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-2">
                  {t("howItWorks.steps.4.title")}
                </h3>
                <p className="text-[#2B2B2B]/70 leading-relaxed text-sm">
                  {t("howItWorks.steps.4.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
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
      </main>
      <Footer />
    </>
  );
}
