"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LocationSection() {
  const t = useTranslations("space");
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageEl = imageRef.current;
    if (!section) return;

    const blocks = section.querySelectorAll("[data-location-block]");
    if (blocks.length > 0) {
      gsap.fromTo(
        blocks,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Subtle parallax on image — anti-gravity feel per DESIGN.md
    if (imageEl) {
      gsap.to(imageEl, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32 lg:py-40 px-6 md:px-8 lg:px-12 bg-base-dark border-t border-base-light/10"
    >
      <div className="absolute inset-0 opacity-[0.08]" aria-hidden>
        <Image
          src="/building.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Image — left, mirrors Renaissance Spirit right-half */}
        <div
          className="relative w-full h-[40vh] md:h-full min-h-[300px] order-2 md:order-1 overflow-hidden rounded-2xl border border-base-light/10"
          data-location-block
        >
          <div ref={imageRef} className="absolute inset-0 -top-[8%] -bottom-[8%]">
            <Image
              src="/building.png"
              alt="Renaissance studio in the city"
              fill
              className="object-cover scale-[1.08]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Right half — label, title, quote, body (mirrors Renaissance Spirit left-half) */}
        <div className="flex flex-col justify-center order-1 md:order-2" data-location-block>
          <div className="mb-12 md:mb-16">
            <span className="inline-flex w-fit px-4 py-1.5 rounded-full border border-base-light/80 text-base-light font-sans text-xl font-medium tracking-widest mb-8">
              {t("location.label")}
            </span>
            <h2 className="text-h2 text-base-light">
              {t("location.title")}
            </h2>
          </div>
          <blockquote className="text-quote-lg text-base-light w-full mb-16 md:mb-20 text-left whitespace-pre-line">
            {t("location.quote")}
          </blockquote>
          <div className="flex flex-col gap-6 md:gap-8 text-left">
            <p className="text-body-lg text-base-light/80">
              {t("location.description1")}
            </p>
            <div className="space-y-4">
              <p className="text-body-lg text-base-light/80">
                {t("location.description2")}
              </p>
              <ul className="list-premium pl-0 space-y-3 text-body-lg text-base-light/80">
                <li>{t("location.benefits.accessible")}</li>
                <li>{t("location.benefits.transport")}</li>
                <li>{t("location.benefits.professional")}</li>
                <li>{t("location.benefits.premium")}</li>
              </ul>
            </div>
            <p className="text-body-lg text-base-light/80">
              {t("location.description3")}
            </p>
            <Link
              href="#environment"
              className="text-sm font-sans font-medium tracking-[0.15em] uppercase text-base-light border-b border-base-light/80 pb-1 w-fit hover:border-accent hover:text-accent transition-colors duration-300"
            >
              {t("location.cta")} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
