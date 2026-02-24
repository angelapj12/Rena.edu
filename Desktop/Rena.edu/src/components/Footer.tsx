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

    const runMarquee = () => {
      gsap.killTweensOf(track);
      const totalWidth = track.scrollWidth;
      const halfWidth = totalWidth / 2; // Exactly 2 identical halves = seamless loop
      if (halfWidth <= 0) return;

      gsap.set(track, { x: 0 });
      gsap.to(track, {
        x: -halfWidth,
        duration: 45,
        ease: "none",
        repeat: -1,
        repeatDelay: 0,
        overwrite: "auto",
        force3D: true,
      });
    };

    // Wait for layout/fonts so scrollWidth is accurate
    const raf = requestAnimationFrame(() => runMarquee());

    // Re-run on resize (font size uses vw/vh) — debounce rapid fires
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(runMarquee, 100);
    });
    ro.observe(track);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimeout);
      ro.disconnect();
      gsap.killTweensOf(track);
    };
  }, []);

  const marqueeText = t("watermark");
  const marqueeItems = Array(MARQUEE_COPIES * 2)
    .fill(marqueeText)
    .flat();

  const pad = "px-6 md:px-8 lg:px-12";
  const gap = "gap-6 md:gap-8 lg:gap-10";

  return (
    <footer className="bg-base-dark max-md:min-h-0 md:h-screen md:min-h-[100vh] flex flex-col overflow-x-hidden">
      {/* 1. Utility — left (slogan + links) | right (for students, for instructors) */}
      <div className={`shrink-0 flex flex-col justify-center ${pad} py-8 md:py-16 lg:py-20`}>
        <div className={`w-full flex flex-col md:flex-row ${gap} md:justify-between md:items-start`}>
          {/* Left — slogan + quick links stacked vertically */}
          <div className="flex flex-col gap-4 md:gap-5 min-w-0">
            <p className="text-xl md:text-quote font-sans font-normal leading-relaxed text-white/60 md:text-white/40">
              {t("slogan")}
            </p>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm md:text-base font-sans text-white/40 hover:text-white/60 leading-relaxed transition-colors duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/space"
                className="text-sm md:text-base font-sans text-white/40 hover:text-white/60 leading-relaxed transition-colors duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              >
                {t("nav.space")}
              </Link>
              <Link
                href="/timetable"
                className="text-sm md:text-base font-sans text-white/40 hover:text-white/60 leading-relaxed transition-colors duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              >
                {t("nav.timetable")}
              </Link>
            </nav>
          </div>

          {/* Right — for students, link | for instructors, link */}
          <div className="flex flex-col gap-6 md:gap-8 min-w-0 md:text-right">
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-white/30 md:text-white/40">
                {t("forStudents")}
              </h3>
              <a
                href="https://whatsapp.com/channel/0029Vb7MW6NI7BeM6rowMB2f"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-sans font-medium tracking-[0.15em] uppercase text-white/40 border-b border-white/40 pb-1 w-fit hover:border-accent hover:text-accent transition-colors duration-300 md:ml-auto"
              >
                {t("joinCommunity")} →
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-white/30 md:text-white/40">
                {t("forInstructors")}
              </h3>
              <Link
                href="/book"
                className="text-sm font-sans font-medium tracking-[0.15em] uppercase text-white/40 border-b border-white/40 pb-1 w-fit hover:border-accent hover:text-accent transition-colors duration-300 md:ml-auto"
              >
                {t("teachWithUs")} →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Marquee — text fills container height (max size) */}
      <div
        className="max-md:shrink-0 max-md:min-h-24 max-md:border-t max-md:border-white/10 md:flex-1 md:min-h-0 w-full overflow-hidden flex items-center"
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
            className="flex items-center h-full whitespace-nowrap will-change-transform"
          >
            {marqueeItems.map((item, i) => (
              <span
                key={i}
                className="font-bold uppercase text-white/30 md:text-white/40 tracking-tighter leading-none mr-4 md:mr-8 flex items-center h-full"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "min(20vw, 50vh)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Legals */}
      <div className={`shrink-0 ${pad} py-4 md:py-8 border-t border-white/10`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
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
