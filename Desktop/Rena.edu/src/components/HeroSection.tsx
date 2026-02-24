"use client";

import { useRef, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";

export default function HeroSection() {
  const t = useTranslations("homepage.hero");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [titleRef.current, descRef.current, linksRef.current].filter(Boolean);
    if (els.length === 0) return;

    gsap.fromTo(
      els,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.12,
        ease: "power3.out",
        overwrite: "auto",
      }
    );
  }, []);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    gsap.to(bg, {
      scale: 1.08,
      duration: 8,
      ease: "none",
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-end md:items-center overflow-hidden">
      {/* Full-bleed background with slow zoom */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-100"
        style={{
          backgroundImage: "url('/home_hero.jpeg')",
          transformOrigin: "center center",
        }}
      />
      <div className="absolute inset-0 bg-base-dark/25" aria-hidden="true" />

      {/* Left-aligned content block — Inner Flow style */}
      <div className="relative z-10 w-full max-w-3xl px-6 md:px-8 lg:px-12 pb-20 md:pb-0">
        <h1
          ref={titleRef}
          className="text-display text-white mb-10 drop-shadow-sm"
        >
          {t("title")}
        </h1>

        <p
          ref={descRef}
          className="text-base md:text-lg font-sans text-white/90 leading-relaxed mb-10 max-w-xl"
        >
          {t("description")}
        </p>

        <div ref={linksRef} className="flex flex-col gap-4 w-fit">
          <Link
            href="/space"
            className="text-lg md:text-xl font-sans text-white leading-relaxed hover:text-white/80 transition-colors"
          >
            {t("subLink1")}
          </Link>
          <Link
            href="/book"
            className="text-lg md:text-xl font-sans text-white leading-relaxed hover:text-white/80 transition-colors"
          >
            {t("subLink2")}
          </Link>
        </div>
      </div>
    </section>
  );
}
