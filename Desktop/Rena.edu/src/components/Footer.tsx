"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-[#E8E6E3] bg-[#FAF9F7] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#2B2B2B]/60 text-sm">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="text-[#2B2B2B]/60 text-sm">
            {t("tagline")}
          </p>
        </div>
      </div>
    </footer>
  );
}

