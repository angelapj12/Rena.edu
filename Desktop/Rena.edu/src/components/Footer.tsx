"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { gsap } from "gsap";

const MARQUEE_COPIES = 4; // Duplicated for seamless loop (2 identical halves)

export default function Footer() {
  const t = useTranslations("footer");
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    // Seamless infinite marquee — constant stately pace
    const marqueeWidth = track.scrollWidth / 2; // Half = one full set for seamless loop
    gsap.to(track, {
      x: -marqueeWidth,
      duration: 45,
      ease: "none",
      repeat: -1,
    });

    return () => gsap.killTweensOf(track);
  }, []);

  const marqueeText = t("watermark");
  const marqueeItems = Array(MARQUEE_COPIES * 2)
    .fill(marqueeText)
    .flat();

  const pad = "px-6 md:px-8 lg:px-12";
  const gap = "gap-6 md:gap-8 lg:gap-10";

  return (
    <footer className="bg-base-dark h-screen min-h-[100vh] flex flex-col overflow-x-hidden">
      {/* 1. Utility — 3 columns, stretched evenly */}
      <div className={`shrink-0 flex flex-col justify-center ${pad} py-12 md:py-16 lg:py-20`}>
        <div className={`w-full grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] ${gap} items-stretch`}>
          {/* Column 1 — slogan + nav links */}
          <div className="flex flex-col gap-6 justify-center min-w-0">
            <p className="text-quote font-sans font-normal leading-relaxed text-white/40">
              {t("slogan")}
            </p>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-base font-sans text-white/40 hover:text-white/60 leading-relaxed transition-colors duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/space"
                className="text-base font-sans text-white/40 hover:text-white/60 leading-relaxed transition-colors duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              >
                {t("nav.space")}
              </Link>
              <Link
                href="/timetable"
                className="text-base font-sans text-white/40 hover:text-white/60 leading-relaxed transition-colors duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              >
                {t("nav.timetable")}
              </Link>
            </nav>
          </div>

          {/* Column 2 — For Students */}
          <div className="flex flex-col gap-4 justify-center min-w-0">
            <h3 className="text-base font-sans font-medium text-white/40">
              {t("forStudents")}
            </h3>
            <Link
              href="/space"
              className="text-sm font-sans font-medium tracking-[0.15em] uppercase text-white/40 border-b border-white/40 pb-1 w-fit hover:border-accent hover:text-accent transition-colors duration-300"
            >
              {t("joinCommunity")} →
            </Link>
          </div>

          {/* Column 3 — For Instructors */}
          <div className="flex flex-col gap-4 justify-center min-w-0">
            <h3 className="text-base font-sans font-medium text-white/40">
              {t("forInstructors")}
            </h3>
            <Link
              href="/book"
              className="text-sm font-sans font-medium tracking-[0.15em] uppercase text-white/40 border-b border-white/40 pb-1 w-fit hover:border-accent hover:text-accent transition-colors duration-300"
            >
              {t("teachWithUs")} →
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Marquee — fills remaining space */}
      <div
        className="flex-1 min-h-0 w-full overflow-hidden flex items-center"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <div className="flex items-center w-full h-full">
          <div
            ref={marqueeTrackRef}
            className="flex items-center whitespace-nowrap will-change-transform"
          >
            {marqueeItems.map((item, i) => (
              <span
                key={i}
                className="text-[6vw] sm:text-[8vw] md:text-[12vw] lg:text-[16vw] xl:text-[20vw] font-bold uppercase text-white/40 tracking-tighter px-3 md:px-6 mr-8 md:mr-16 lg:mr-24"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Legals */}
      <div className={`shrink-0 ${pad} py-6 md:py-8 border-t border-white/10`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs font-sans text-white/40">
            {t("copyright", { year: new Date().getFullYear() })}{" "}
            <Link
              href="/privacy"
              className="underline hover:text-white/60 transition-colors duration-300"
            >
              {t("privacyPolicy")}
            </Link>{" "}
            |{" "}
            <Link
              href="/cookies"
              className="underline hover:text-white/60 transition-colors duration-300"
            >
              {t("cookiesPolicy")}
            </Link>
          </p>
          <p className="text-xs font-sans text-white/40 flex items-center gap-1.5">
            <span aria-hidden="true">📍</span>
            {t("address")}
          </p>
        </div>
      </div>
    </footer>
  );
}
