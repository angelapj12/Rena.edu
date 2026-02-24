"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function RenaissanceSpirit() {
  const t = useTranslations("homepage.renaissanceSpirit");

  return (
    <section className="relative overflow-hidden bg-base-light min-h-screen md:h-screen grid grid-cols-1 md:grid-cols-2 px-6 md:px-8 lg:px-12 py-12 md:py-16">
      {/* Subtle full-width background for immersive feel */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden>
        <Image
          src="/spirit.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Left half — text content */}
      <div className="relative z-10 flex flex-col justify-center py-12 md:py-16 order-2 md:order-1">
        <div className="mb-12 md:mb-16">
          <span className="inline-flex w-fit px-4 py-1.5 rounded-full border border-base-dark text-base-dark font-sans text-xl font-medium tracking-widest">
            {t("label")}
          </span>
        </div>
        <blockquote className="text-quote-lg text-base-dark w-full mb-16 md:mb-20 text-left whitespace-pre-line">
          {t("mission")}
        </blockquote>
        <div className="flex flex-col gap-6 md:gap-8 text-left">
          <p className="text-body-lg font-sans text-base-dark leading-relaxed">
            {t("paragraph1")}
          </p>
          <p className="text-body-lg font-sans text-base-dark leading-relaxed">
            {t("paragraph2")}
          </p>
          <Link
            href="/space"
            className="text-sm font-sans font-medium tracking-[0.15em] uppercase text-base-dark border-b border-base-dark pb-1 w-fit hover:border-accent hover:text-accent transition-colors"
          >
            {t("cta")} →
          </Link>
        </div>
      </div>

      {/* Right half — image, margin on top/bottom/right (from section padding) */}
      <div className="relative w-full h-[28vh] min-h-[200px] md:h-full md:min-h-[300px] order-1 md:order-2 overflow-hidden rounded-2xl">
        <Image
          src="/spirit.png"
          alt="Renaissance space"
          fill
          className="object-cover grayscale"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    </section>
  );
}
