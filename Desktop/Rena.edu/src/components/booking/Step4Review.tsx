"use client";

import { useTranslations } from "next-intl";

type FormData = {
  chineseLastName: string;
  chineseFirstName: string;
  englishName: string;
  email: string;
  phone: string;
  classDescription: string;
  preferredTimes: string;
  accessOption: string;
  additionalNotes: string;
  equipment: string[];
};

type Step4ReviewProps = {
  formData: FormData;
  onEditStep: (step: number) => void;
  updateFormData: (field: keyof FormData, value: string | string[]) => void;
};

export default function Step4Review({
  formData,
  onEditStep,
  updateFormData,
}: Step4ReviewProps) {
  const t = useTranslations("booking.step5");
  const tCommon = useTranslations("common");
  const tStep3 = useTranslations("booking.step3");
  const tStep4 = useTranslations("booking.step4");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-serif font-medium text-[#2B2B2B] mb-4">
          {t("title")}
        </h2>
        <div className="bg-[#FAF9F7] p-6 rounded-lg border border-[#E8E6E3] mb-6">
          <p className="text-[#2B2B2B]/80 leading-relaxed">
            {t("note")}
          </p>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8E6E3]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-serif font-medium text-[#2B2B2B]">
            {t("sections.contactInfo")}
          </h3>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="text-sm text-[#2B2B2B]/70 hover:text-[#2B2B2B] underline transition-colors"
          >
            {tCommon("edit")}
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium text-[#2B2B2B]/60 mb-1">
              {t("sections.chineseName")}
            </div>
            <div className="text-[#2B2B2B]">
              {formData.chineseLastName} {formData.chineseFirstName}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-[#2B2B2B]/60 mb-1">
              {t("sections.englishName")}
            </div>
            <div className="text-[#2B2B2B]">
              {formData.englishName || tCommon("notProvided")}
            </div>
          </div>
        </div>
      </div>

      {/* Email and Phone Section */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8E6E3]">
        <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-4">
          {t("sections.contactDetails")}
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#2B2B2B] mb-2"
            >
              {t("sections.email")} *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              className="w-full px-4 py-3 border border-[#E8E6E3] rounded-lg focus:ring-2 focus:ring-[#FF7A5C] focus:border-transparent bg-[#FAF9F7] text-[#2B2B2B]"
              placeholder={t("placeholders.email")}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#2B2B2B] mb-2"
            >
              {t("sections.phone")} *
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => updateFormData("phone", e.target.value)}
              className="w-full px-4 py-3 border border-[#E8E6E3] rounded-lg focus:ring-2 focus:ring-[#FF7A5C] focus:border-transparent bg-[#FAF9F7] text-[#2B2B2B]"
              placeholder={t("placeholders.phone")}
            />
          </div>
        </div>
      </div>

      {/* Class Details Section */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8E6E3]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-serif font-medium text-[#2B2B2B]">
            {t("sections.classDetails")}
          </h3>
          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="text-sm text-[#2B2B2B]/70 hover:text-[#2B2B2B] underline transition-colors"
          >
            {tCommon("edit")}
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium text-[#2B2B2B]/60 mb-1">
              {t("sections.classDescription")}
            </div>
            <div className="text-[#2B2B2B]">
              {formData.classDescription || tCommon("notProvided")}
            </div>
          </div>
          {formData.preferredTimes && (
            <div>
              <div className="text-sm font-medium text-[#2B2B2B]/60 mb-1">
                {t("sections.preferredTimes")}
              </div>
              <div className="text-[#2B2B2B]">{formData.preferredTimes}</div>
            </div>
          )}
        </div>
      </div>

      {/* Access Option Section */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8E6E3]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-serif font-medium text-[#2B2B2B]">
            {t("sections.accessOption")}
          </h3>
          <button
            type="button"
            onClick={() => onEditStep(3)}
            className="text-sm text-[#2B2B2B]/70 hover:text-[#2B2B2B] underline transition-colors"
          >
            {tCommon("edit")}
          </button>
        </div>
        <div className="space-y-3">
          {formData.accessOption && (
            <div>
              <div className="text-sm font-medium text-[#2B2B2B]/60 mb-1">
                {t("sections.accessOption")}
              </div>
              <div className="text-[#2B2B2B]">
                {formData.accessOption === "flexible"
                  ? tStep3("options.flexible.title")
                  : formData.accessOption === "committed"
                  ? tStep3("options.committed.title")
                  : formData.accessOption === "resident"
                  ? tStep3("options.resident.title")
                  : formData.accessOption}
              </div>
            </div>
          )}
          {formData.additionalNotes && (
            <div>
              <div className="text-sm font-medium text-[#2B2B2B]/60 mb-1">
                {t("sections.additionalNotes")}
              </div>
              <div className="text-[#2B2B2B]">{formData.additionalNotes}</div>
            </div>
          )}
        </div>
      </div>

      {/* Equipment Section */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8E6E3]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-serif font-medium text-[#2B2B2B]">
            {t("sections.equipment")}
          </h3>
          <button
            type="button"
            onClick={() => onEditStep(4)}
            className="text-sm text-[#2B2B2B]/70 hover:text-[#2B2B2B] underline transition-colors"
          >
            {tCommon("edit")}
          </button>
        </div>
        <div className="space-y-3">
          {formData.equipment && formData.equipment.length > 0 ? (
            <div>
              <div className="text-sm font-medium text-[#2B2B2B]/60 mb-2">
                {t("sections.selectedEquipment")}
              </div>
              <div className="space-y-2">
                {formData.equipment.map((equipmentId) => (
                  <div key={equipmentId} className="text-[#2B2B2B]">
                    • {tStep4(`equipment.${equipmentId}`)}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-[#2B2B2B]/60">{t("sections.noEquipment")}</div>
          )}
        </div>
      </div>
    </div>
  );
}

