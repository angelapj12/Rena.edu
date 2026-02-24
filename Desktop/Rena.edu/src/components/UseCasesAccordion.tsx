"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const USE_CASE_KEYS = [
  "weeklyClass",
  "testCourse",
  "intensive",
  "professionalTraining",
  "seminar",
  "popupClass",
] as const;

const IMAGE_MAP: Record<(typeof USE_CASE_KEYS)[number], string> = {
  weeklyClass: "/yoga studio.png",
  testCourse: "/sound therapy.png",
  intensive: "/corporate training.png",
  professionalTraining: "/training.png",
  seminar: "/seminar.jpeg",
  popupClass: "/small class.png",
};

type UseCasesAccordionProps = {
  translationsKey?: string;
};

export default function UseCasesAccordion({ translationsKey = "space.useCases" }: UseCasesAccordionProps) {
  const t = useTranslations(translationsKey);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="py-24 md:py-32 lg:py-40 px-6 md:px-8 lg:px-12 bg-secondary-light">
      <div className="text-center mb-16 md:mb-20">
        <span className="inline-flex w-fit px-4 py-1.5 rounded-full border border-base-dark text-base-dark font-sans text-xl font-medium tracking-widest mb-8 md:mb-10">
          {t("label")}
        </span>
        <h2 className="text-h2 text-base-dark">
          {t("title")}
        </h2>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left — image area with cross-fade */}
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] rounded-2xl overflow-hidden">
          {USE_CASE_KEYS.map((key, i) => (
            <div
              key={key}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={IMAGE_MAP[key]}
                alt={t(`cards.${key}.title`)}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>

        {/* Right — accordion */}
        <div className="flex flex-col gap-0">
          {USE_CASE_KEYS.map((key, i) => (
            <div
              key={key}
              className={`rounded-xl border overflow-hidden transition-all duration-300 ease-out border-b border-dashed border-base-dark/20 last:border-b-0 mb-4 last:mb-0 ${
                i === activeIndex
                  ? "bg-base-light border-accent/50 shadow-sm"
                  : "bg-base-light border-secondary-light hover:border-accent/20"
              }`}
              onMouseEnter={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-base-light/80 transition-all duration-300"
              >
                <h3 className="text-h3 text-base-dark">
                  {t(`cards.${key}.title`)}
                </h3>
                <span
                  className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-base-dark/30 transition-transform duration-300 ${
                    i === activeIndex ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-4 h-4 text-base-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  i === activeIndex ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-base-dark/70 font-sans text-body-lg leading-relaxed">
                    {t(`cards.${key}.description`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
