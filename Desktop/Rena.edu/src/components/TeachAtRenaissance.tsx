"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function TeachAtRenaissance() {
  const t = useTranslations("homepage.teachAtRenaissance");
  const tCommon = useTranslations("common");

  return (
    <section className="grid grid-cols-1 md:grid-cols-[45fr_55fr]">
      {/* Right — sticky image, 55% width (aligns with Our Vision content above) */}
      <div className="w-full relative md:sticky md:top-0 md:min-h-[120vh] order-2 md:order-2">
        <div className="relative w-full h-[50vh] md:h-full md:min-h-[120vh] min-h-[400px]">
          <Image
            src="/teach.png"
            alt="Active classroom at Renaissance"
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
        </div>
      </div>

      {/* Left — scrollable content, 45% width (aligns with Our Vision image above) */}
      <div className="w-full bg-secondary-light flex items-center min-h-screen md:min-h-[120vh] order-1 md:order-1">
        <div className="w-full max-w-7xl mx-auto py-24 md:py-32 lg:py-40 px-6 md:px-8 lg:px-12">
          <span className="inline-flex w-fit px-4 py-1.5 rounded-full border border-base-dark text-base-dark font-sans text-xl font-medium tracking-widest mb-8 md:mb-10">
            {t("label")}
          </span>

          {/* Quote — subtle scroll reveal */}
          <ScrollReveal delay={0.15}>
            <blockquote className="text-quote-lg text-base-dark w-full mb-12 md:mb-16 whitespace-pre-line">
              {t("quote")}
            </blockquote>
          </ScrollReveal>

          {/* Text — width allows paragraph2 to stay on one line (避免「而非燃盡心力。」斷行) */}
          <div className="max-w-[600px] space-y-8 text-base-dark/90 text-body-lg font-sans leading-relaxed">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
          </div>

          <Link
            href="/book"
            className="inline-block mt-10 text-sm font-sans font-medium tracking-[0.15em] uppercase text-base-dark border-b border-base-dark pb-1 w-fit hover:border-accent hover:text-accent transition-colors duration-300"
          >
            {tCommon("submitClass")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
