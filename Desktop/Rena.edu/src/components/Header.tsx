"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function Header() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = params.locale as string;

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E6E3] bg-[#FAF9F7]/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-semibold text-[#2B2B2B]">
          {t("siteName")}
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/space"
            className="text-[#2B2B2B] font-medium hover:text-[#2B2B2B]/70 transition-colors"
          >
            {t("theSpace")}
          </Link>
          <Link
            href="/book"
            className="bg-[#FF7A5C] text-white px-6 py-2 rounded-full font-medium hover:bg-[#FF7A5C]/90 transition-colors"
          >
            {t("submitClass")}
          </Link>
          <div className="flex items-center gap-2 border-l border-[#E8E6E3] pl-6">
            <button
              onClick={() => switchLocale("en")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                currentLocale === "en"
                  ? "bg-[#2B2B2B] text-white"
                  : "text-[#2B2B2B]/70 hover:text-[#2B2B2B]"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => switchLocale("zh-TW")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                currentLocale === "zh-TW"
                  ? "bg-[#2B2B2B] text-white"
                  : "text-[#2B2B2B]/70 hover:text-[#2B2B2B]"
              }`}
            >
              繁中
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

