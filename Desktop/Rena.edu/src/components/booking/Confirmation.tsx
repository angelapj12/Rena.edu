"use client";

import { useTranslations } from "next-intl";

type ConfirmationProps = {
  name: string;
};

export default function Confirmation({ name }: ConfirmationProps) {
  const t = useTranslations("booking.confirmation");

  return (
    <div className="space-y-6 text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-[#FF7A5C] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-4xl font-serif font-semibold text-[#2B2B2B] mb-4">
          {t("title")}
        </h2>
        <p className="text-xl text-[#2B2B2B]/80 leading-relaxed max-w-2xl mx-auto">
          {t("thankYou")}{name ? `, ${name}` : ""}. {t("message")}
        </p>
      </div>

      <div className="bg-[#FAF9F7] p-8 rounded-2xl border border-[#E8E6E3] text-left max-w-2xl mx-auto">
        <p className="text-lg text-[#2B2B2B]/80 leading-relaxed mb-4">
          {t("description1")}
        </p>
        <p className="text-lg text-[#2B2B2B]/80 leading-relaxed">
          {t("description2")}
        </p>
      </div>

      <div className="pt-6">
        <p className="text-[#2B2B2B]/70 leading-relaxed">
          {t("urgent")}
        </p>
      </div>
    </div>
  );
}

