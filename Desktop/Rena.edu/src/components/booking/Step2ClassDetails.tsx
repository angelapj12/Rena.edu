"use client";

import { useTranslations } from "next-intl";

type FormData = {
  classDescription: string;
  preferredTimes: string;
};

type Step2ClassDetailsProps = {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
};

export default function Step2ClassDetails({
  formData,
  updateFormData,
}: Step2ClassDetailsProps) {
  const t = useTranslations("booking.step2");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-h2-compact text-base-dark mb-2">
          {t("title")}
        </h2>
        <p className="text-body-lg text-base-dark/70">
          {t("description")}
        </p>
      </div>

      <div>
        <label
          htmlFor="classDescription"
          className="block text-sm font-medium text-base-dark mb-2"
        >
          {t("classDescription")}
        </label>
        <textarea
          id="classDescription"
          required
          rows={4}
          value={formData.classDescription}
          onChange={(e) => updateFormData("classDescription", e.target.value)}
          className="w-full px-4 py-3 border border-secondary-light rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-base-light-subtle text-base-dark"
          placeholder={t("placeholders.classDescription")}
        />
      </div>

      <div>
        <label
          htmlFor="preferredTimes"
          className="block text-sm font-medium text-base-dark mb-2"
        >
          {t("preferredTimes")}
        </label>
        <input
          type="text"
          id="preferredTimes"
          value={formData.preferredTimes}
          onChange={(e) => updateFormData("preferredTimes", e.target.value)}
          className="w-full px-4 py-3 border border-secondary-light rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-base-light-subtle text-base-dark"
          placeholder={t("placeholders.preferredTimes")}
        />
      </div>
    </div>
  );
}

