"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function HowToGetStarted() {
  const t = useTranslations("homepage.howToGetStarted");
  const tCommon = useTranslations("common");

  const steps = ["1", "2", "3", "4"] as const;
  const step1Href = "/space";
  const step2Href = "/book";

  return (
    <section className="bg-base-light py-24 md:py-32 lg:py-40 px-6 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <span className="inline-flex w-fit px-4 py-1.5 rounded-full border border-base-dark text-base-dark font-sans text-xl font-medium tracking-widest mb-8">
            {t("label")}
          </span>
          <h2 className="text-h2 text-base-dark mb-8 md:mb-10">
            {t("title")}
          </h2>
          <p className="text-xl md:text-2xl font-sans font-normal text-base-dark/90 mb-16">
            {t("headline")}
          </p>
        </ScrollReveal>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Connecting line — centered under number circles */}
          <div
            className="absolute left-5 md:left-6 top-12 bottom-12 w-px bg-base-dark/20"
            aria-hidden
          />

          <ScrollReveal stagger delay={0.2} className="space-y-0">
            {steps.map((key) => {
              const hasCta = key === "1" || key === "2";
              const ctaHref = key === "1" ? step1Href : step2Href;
              const isPrimaryCta = key === "2";

              return (
                <div key={key} className="relative flex gap-6 md:gap-10 pb-16 last:pb-0">
                  {/* Number circle */}
                  <div className="relative z-10 shrink-0 w-10 md:w-12 h-10 md:h-12 rounded-full border-2 border-base-dark bg-base-light flex items-center justify-center">
                    <span className="font-sans text-sm font-medium text-base-dark">
                      {t(`steps.${key}.number`)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="text-xl md:text-2xl font-sans font-normal text-base-dark mb-2">
                      {t(`steps.${key}.title`)}
                    </h3>
                    {t(`steps.${key}.description`) && (
                      <p className="text-base-dark/80 font-sans text-body-lg leading-relaxed mb-4">
                        {t(`steps.${key}.description`)}
                      </p>
                    )}
                    {hasCta && (
                      <Link
                        href={ctaHref}
                        className={`inline-block text-sm font-sans font-medium tracking-[0.15em] uppercase pb-1 w-fit transition-colors duration-300 ${
                          isPrimaryCta
                            ? "text-accent border-b-2 border-accent hover:border-base-dark hover:text-base-dark"
                            : "text-base-dark border-b border-base-dark hover:border-accent hover:text-accent"
                        }`}
                      >
                        {t(`steps.${key}.cta`)} →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </ScrollReveal>
        </div>

        {/* What's Next — conclusion with CTAs */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-base-dark/20">
            <p className="text-lg md:text-xl font-sans font-normal text-base-dark/90 mb-8">
              {t("ctaPrompt")}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <a
                href="https://wa.me/85363960321"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-sans font-medium tracking-[0.15em] uppercase text-base-dark border-b border-base-dark pb-1 w-fit hover:border-accent hover:text-accent transition-colors duration-300"
              >
                {tCommon("bookTour")} →
              </a>
              <Link
                href="/book"
                className="text-sm font-sans font-medium tracking-[0.15em] uppercase text-accent border-b-2 border-accent pb-1 w-fit hover:border-base-dark hover:text-base-dark transition-colors duration-300"
              >
                {tCommon("submitClass")} →
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
