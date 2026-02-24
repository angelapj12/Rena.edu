"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function OurVision() {
  const t = useTranslations("homepage.ourVision");

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/our_vision.jpeg"
          alt=""
          fill
          className="object-cover object-[center_65%] scale-x-[-1]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-base-dark/75" aria-hidden />
      </div>

      {/* Content: quote at top, paragraphs at bottom */}
      <div className="relative z-10 flex flex-col justify-between h-full py-24 md:py-32 lg:py-40 px-6 md:px-8 lg:px-12 w-full">
          {/* Top: label + quote */}
          <div>
            <ScrollReveal delay={0.1}>
              <span className="inline-flex w-fit px-4 py-1.5 rounded-full border border-base-light/30 bg-base-light/5 backdrop-blur-sm font-sans text-xl font-medium tracking-widest text-base-light/90 mb-8 md:mb-10">
                {t("label")}
              </span>
            </ScrollReveal>
            <blockquote className="text-quote-lg text-base-light w-full whitespace-pre-line">
              {t("line1")}
            </blockquote>
          </div>

          {/* Bottom: section texts — stretched to bottom */}
          <ScrollReveal stagger delay={0.3} className="max-w-2xl text-base-light/90 text-lg md:text-xl font-sans leading-relaxed space-y-6">
            <p>
              {t("line2Before")}{" "}
              <span className="font-sans text-accent border-b-2 border-accent/60 pb-0.5">
                {t("line2Highlight")}
              </span>{" "}
              {t("line2After")}
            </p>
            <p>
              {t("line3")} {t("line4")}
            </p>
          </ScrollReveal>
        </div>
    </section>
  );
}
