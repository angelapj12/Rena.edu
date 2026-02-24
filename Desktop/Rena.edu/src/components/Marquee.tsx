"use client";

import { useTranslations } from "next-intl";

type MarqueeProps = {
  translationsKey?: "space.marquee";
};

export default function Marquee({ translationsKey = "space.marquee" }: MarqueeProps) {
  const t = useTranslations(translationsKey);
  const items = t.raw("items") as string[];

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="overflow-hidden py-4 md:py-6 bg-secondary-light">
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {duplicatedItems.map((item, index) => (
            <span key={index} className="text-xl md:text-2xl lg:text-3xl text-base-dark/70 font-sans">
              {item}
              {index < duplicatedItems.length - 1 && (
                <span className="mx-4">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

