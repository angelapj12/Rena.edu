"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AccessOptionsCardsProps = {
  highlightedIndex?: number | null;
};

export default function AccessOptionsCards({ highlightedIndex = null }: AccessOptionsCardsProps) {
  const t = useTranslations("space.pricing.options");
  const containerRef = useRef<HTMLDivElement>(null);

  const cardConfigs = [
    { key: "flexible" as const },
    { key: "committed" as const },
    { key: "resident" as const },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll("[data-pricing-card]");
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: container,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          onComplete: () => {
            gsap.set(cards, { clearProps: "transform" });
          },
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <div ref={containerRef} className="grid md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
      {cardConfigs.map(({ key }, index) => {
        const isHighlighted = highlightedIndex === index;

        return (
          <div
            key={key}
            data-pricing-card
            className={`
              p-8 lg:p-10 rounded-2xl flex flex-col min-h-[320px] md:min-h-[420px] relative
              transition-all duration-300 ease-out border
              ${isHighlighted
                ? "scale-[1.02] -translate-y-1 md:-translate-y-2 z-20 bg-secondary-light border-accent/30 shadow-[0_4px_24px_rgba(0,0,0,0.15)]"
                : "scale-100 translate-y-0 z-0 bg-white/95 border-base-light/20 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"}
            `}
          >
            {/* Group 1: Title + Subtitle */}
            <div className="mb-8">
              <h3
                className="text-h2-compact font-normal mb-1 text-base-dark transition-colors duration-300"
              >
                {t(`${key}.title`)}
              </h3>
              <p
                className={`font-sans font-medium text-body-lg transition-colors duration-300 ${
                  isHighlighted ? "text-base-dark/80" : "text-base-dark/70"
                }`}
              >
                {t(`${key}.subtitle`)}
              </p>
            </div>

            {/* Group 2: Features (tighter line height) */}
            <ul
              className={`list-premium space-y-1.5 mb-8 font-sans text-body leading-snug flex-1 transition-colors duration-300 ${
                  isHighlighted ? "text-base-dark/80" : "text-base-dark/75"
                }`}
            >
              {(t.raw(`${key}.features`) as string[]).map((feature: string, i: number) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            {/* Group 3: Note */}
            <p
              className={`font-sans text-body leading-relaxed transition-colors duration-300 ${
                  isHighlighted ? "text-base-dark/70" : "text-base-dark/60"
                }`}
            >
              {t(`${key}.note`)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
