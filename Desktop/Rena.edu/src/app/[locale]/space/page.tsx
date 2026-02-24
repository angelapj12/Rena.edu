import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import UseCasesAccordion from "@/components/UseCasesAccordion";
import AccessOptionsSection from "@/components/AccessOptionsSection";
import LocationSection from "@/components/LocationSection";
import EnvironmentSection from "@/components/EnvironmentSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function SpacePage() {
  const t = await getTranslations("space");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-base-light">
        {/* Hero Section — full-bleed like homepage */}
        <ScrollReveal>
          <section className="relative min-h-screen flex items-end md:items-center overflow-hidden border-b border-secondary-light">
            <div className="absolute inset-0">
              <Image
                src="/space_hero.jpeg"
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-base-dark/50" aria-hidden />
            </div>
            <div className="relative z-10 w-full max-w-3xl px-6 md:px-8 lg:px-12 pb-20 md:pb-0 pt-24 md:pt-0">
              <h1 className="text-display-sm text-white mb-12 md:mb-16 drop-shadow-sm">
                {t("hero.title")}
              </h1>
              <p className="text-lead text-white/90 max-w-xl leading-relaxed">
                {t("hero.description")}
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* The Environment — three-block grid with staggered reveal */}
        <EnvironmentSection
          label={t("environment.label")}
          titleLines={[1, 2, 3, 4].map((i) => t(`environment.titleLines.${i}`))}
          intro={t("environment.intro")}
          features={[
            t("environment.features.licensed"),
            t("environment.features.furnished"),
            t("environment.features.simple"),
            t("environment.features.exclusive"),
          ]}
          cta={t("environment.cta")}
        />

        {/* In the Heart of the City — dark, immersive with staggered animations */}
        <LocationSection />

        {/* Use Cases — Accordion with cross-fading image */}
        <ScrollReveal>
          <UseCasesAccordion translationsKey="space.useCases" />
        </ScrollReveal>

        {/* Access Options — Dark contrast: tiered cards, zone-based selection */}
        <ScrollReveal>
          <AccessOptionsSection />
        </ScrollReveal>

        {/* This Space Works Best For — 2-column: left intro, right cards */}
        <ScrollReveal>
        <section className="py-24 md:py-32 lg:py-40 px-6 md:px-8 lg:px-12 bg-base-light border-t border-secondary-light">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              {/* Left — label, intro */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <span className="inline-flex w-fit px-4 py-1.5 rounded-full border border-base-dark text-base-dark font-sans text-xl font-medium tracking-widest mb-8 md:mb-10">
                  {t("audience.label")}
                </span>
                <div className="space-y-8">
                  <p className="text-base-dark/80 font-sans text-body-lg leading-relaxed">
                    {t("audience.intro1")}
                  </p>
                  <p className="text-base-dark/80 font-sans text-body-lg leading-relaxed">
                    {t("audience.intro2")}
                  </p>
                </div>
              </div>

              {/* Right — 4 stacked cards */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                {[
                  { key: "instructors", icon: "person", bg: "bg-secondary-light" },
                  { key: "academies", icon: "group", bg: "bg-secondary-light/80" },
                  { key: "institutions", icon: "building", bg: "bg-secondary-light" },
                  { key: "shortTerm", icon: "calendar", bg: "bg-secondary-light/80" },
                ].map(({ key, bg }) => (
                  <div
                    key={key}
                    className={`${bg} p-6 md:p-8 rounded-2xl border border-secondary-light hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-300 ease-out group`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-base-dark">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {key === "instructors" && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          )}
                          {key === "academies" && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          )}
                          {key === "institutions" && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          )}
                          {key === "shortTerm" && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          )}
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl md:text-2xl font-sans font-normal text-base-dark leading-tight mb-2">
                          {t(`audience.cards.${key}.title`)}
                        </h3>
                        <p className="text-base-dark/70 font-sans text-body-lg leading-relaxed">
                          {t(`audience.cards.${key}.description`)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* Final CTA — premium dark section with atmospheric background image */}
        <section className="relative h-screen min-h-[100vh] overflow-hidden bg-base-dark">
          {/* Background image — atmospheric, adds depth */}
          <div className="absolute inset-0">
            <Image
              src="/cta.jpeg"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
            {/* Overlay — darkens image for text readability */}
            <div
              className="absolute inset-0"
              aria-hidden
              style={{
                background: "linear-gradient(180deg, rgba(10,34,41,0.72) 0%, rgba(10,34,41,0.86) 50%, rgba(10,34,41,0.96) 100%)",
              }}
            />
          </div>

          {/* Centered content — generous spacing, premium typography */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[100vh] py-28 md:py-36 px-6 md:px-8 lg:px-12">
            <div className="w-full max-w-7xl mx-auto text-center">
              <blockquote className="text-quote-lg text-base-light mb-10 md:mb-12 whitespace-normal lg:whitespace-nowrap">
                {t("finalCta.quote")}
              </blockquote>
              <p className="text-body-lg font-sans text-base-light/80 leading-relaxed mb-14 md:mb-16 max-w-2xl mx-auto whitespace-pre-line">
                {t("finalCta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/book"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 md:px-10 py-4 rounded-full bg-base-light text-base-dark font-sans text-sm font-medium tracking-[0.2em] uppercase hover:bg-base-light/95 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  {t("finalCta.buttonSubmit")}
                </Link>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 md:px-10 py-4 rounded-full border border-base-light/60 text-base-light font-sans text-sm font-medium tracking-[0.2em] uppercase hover:bg-base-light/10 hover:border-base-light/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  {t("finalCta.buttonTalk")}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee — right above footer */}
        <Marquee translationsKey="space.marquee" />
      </main>
      <Footer />
    </>
  );
}
