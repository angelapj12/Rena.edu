"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function Header() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = params.locale as string;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: t("siteName") },
    { href: "/space", label: t("theSpace") },
    { href: "/book", label: t("submitClass") },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f2f0ed]/80 backdrop-blur-[10px] border-b border-[#e5e0de]">
        <nav className="w-full px-6 md:px-8 lg:px-12 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-sans font-normal text-base-dark"
          >
            {t("navBrand")}
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/space"
              className="hidden md:inline text-xs tracking-[0.2em] uppercase font-sans text-base-dark/70 hover:text-base-dark transition-colors duration-300"
            >
              {t("theSpace")}
            </Link>
            <Link
              href="/book"
              className="hidden md:inline text-xs tracking-[0.2em] uppercase font-sans text-base-dark/70 hover:text-base-dark transition-colors duration-300"
            >
              {t("submitClass")}
            </Link>

            {/* 2-line hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex flex-col gap-1.5 p-1 text-base-dark"
              aria-label="Open menu"
            >
              <span className="block w-6 h-0.5 bg-current" />
              <span className="block w-5 h-0.5 bg-current ml-auto" />
            </button>
          </div>
        </nav>
      </header>
      {/* Spacer so content is not hidden under fixed header */}
      <div className="h-16" aria-hidden="true" />

      {/* Full-screen overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-base-dark transition-opacity duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col justify-center items-center px-6 md:px-8 lg:px-12">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-8 right-12 md:right-20 text-base-light/70 hover:text-white text-sm tracking-widest uppercase font-sans transition-colors"
            aria-label="Close menu"
          >
            Close
          </button>

          <nav className="flex flex-col items-center gap-8 md:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-display text-base-light hover:text-accent transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-12 left-12 md:left-20 flex gap-6">
            <button
              onClick={() => switchLocale("en")}
              className={`text-sm tracking-[0.2em] uppercase font-sans transition-colors ${
                currentLocale === "en" ? "text-accent" : "text-base-light/60 hover:text-base-light"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => switchLocale("zh-TW")}
              className={`text-sm tracking-[0.2em] uppercase font-sans transition-colors ${
                currentLocale === "zh-TW" ? "text-accent" : "text-base-light/60 hover:text-base-light"
              }`}
            >
              繁中
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
