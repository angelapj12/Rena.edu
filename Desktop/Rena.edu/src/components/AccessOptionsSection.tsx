"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import AccessOptionsCards from "./AccessOptionsCards";

export default function AccessOptionsSection() {
  const t = useTranslations("space");
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const third = width / 3;

      if (x < third) {
        setHighlightedIndex(0);
      } else if (x < third * 2) {
        setHighlightedIndex(1);
      } else {
        setHighlightedIndex(2);
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setHighlightedIndex(null);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 px-6 md:px-8 lg:px-12 bg-base-dark border-t border-base-light/10"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-20 md:mb-24 text-center">
          <span className="inline-flex w-fit px-4 py-1.5 rounded-full border border-base-light/80 text-base-light font-sans text-xl font-medium tracking-widest mb-8 md:mb-10">
            {t("pricing.label")}
          </span>
          <h2 className="text-h2 text-base-light mb-6 md:mb-8">
            {t("pricing.title")}
          </h2>
          <p className="text-body-lg text-base-light/80 font-sans leading-relaxed max-w-2xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </div>

        <AccessOptionsCards highlightedIndex={highlightedIndex} />
      </div>
    </section>
  );
}
