"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type EnvironmentSectionProps = {
  label: string;
  titleLines: string[];
  intro: string;
  features: string[];
  cta: string;
};

export default function EnvironmentSection({
  label,
  titleLines,
  intro,
  features,
  cta,
}: EnvironmentSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageEl = imageRef.current;
    if (!section) return;

    const blocks = section.querySelectorAll("[data-env-block]");
    if (blocks.length > 0) {
      gsap.fromTo(
        blocks,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Subtle image scale-in — premium reveal per DESIGN.md
    if (imageEl) {
      const img = imageEl.querySelector("img");
      if (img) {
        gsap.fromTo(
          img,
          { scale: 0.98 },
          {
            scale: 1,
            duration: 1.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageEl,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  const pad = "p-6 md:p-8 lg:p-10";
  const gap = "gap-4 md:gap-6 lg:gap-8";

  return (
    <section
      ref={sectionRef}
      id="environment"
      className={`relative overflow-hidden h-screen min-h-[100vh] flex flex-col ${pad} bg-base-light border-t border-secondary-light`}
    >
      <div className={`relative z-10 flex-1 min-h-0 flex items-center justify-center`}>
        <div className={`w-full h-full min-h-0 grid grid-cols-1 lg:grid-cols-12 ${gap} items-stretch`}>
          {/* Left — section title only */}
          <div
            className={`flex flex-col justify-center order-2 lg:order-1 lg:col-span-3 w-full min-w-0 ${pad}`}
            data-env-block
          >
            <span className="inline-flex w-fit px-4 py-1.5 rounded-full border border-base-dark text-base-dark font-sans text-xl font-medium tracking-widest mb-8">
              {label}
            </span>
            <h2 className="text-h2 text-base-dark">
              {titleLines.filter(Boolean).map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          {/* Center — image */}
          <div
            className={`relative w-full min-w-0 min-h-0 ${pad} flex items-center justify-center order-1 lg:order-2 lg:col-span-6 overflow-hidden`}
            data-env-block
          >
            <div
              ref={imageRef}
              className="relative w-full max-h-full aspect-[4/5] lg:aspect-[3/4] overflow-hidden border border-secondary-light"
            >
              <Image
                src="/the space.jpg"
                alt="Classroom at Renaissance"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right — body text */}
          <div
            className={`flex flex-col justify-center order-3 lg:order-3 lg:col-span-3 w-full min-w-0 pl-2 pr-4 md:pl-3 md:pr-6 lg:pl-4 lg:pr-8 py-6 md:py-8`}
            data-env-block
          >
            <p className="text-body-lg text-base-dark/90 leading-snug mb-6">
              {intro}
            </p>
            <ul className="list-premium space-y-4 text-base-dark/90 font-sans text-body-lg leading-relaxed pl-0 mb-6">
              {features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-sans font-medium tracking-[0.15em] uppercase text-base-dark border-b border-base-dark pb-1 w-fit hover:border-accent hover:text-accent transition-colors duration-300"
            >
              {cta} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
