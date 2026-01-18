"use client";

import { useTranslations } from "next-intl";

type FormNavigationProps = {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  previousLabel?: string;
  nextLabel?: string;
  submitLabel?: string;
  isSubmitting?: boolean;
};

export default function FormNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  previousLabel,
  nextLabel,
  submitLabel,
  isSubmitting = false,
}: FormNavigationProps) {
  const t = useTranslations("common");
  
  const prevLabel = previousLabel || t("previous");
  const nextLabelText = nextLabel || t("continue");
  const submitLabelText = submitLabel || t("submitRequest");
  const submittingText = t("submitting");
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#E8E6E3]">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`px-6 py-3 rounded-full font-medium transition-colors ${
          isFirstStep
            ? "text-[#2B2B2B]/30 cursor-not-allowed"
            : "text-[#2B2B2B] hover:bg-[#FAF9F7]"
        }`}
      >
        {prevLabel}
      </button>

      {isLastStep ? (
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-[#FF7A5C] text-white px-6 py-3 rounded-full font-medium transition-colors ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#FF7A5C]/90"
          }`}
        >
          {isSubmitting ? submittingText : submitLabelText}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="bg-[#2B2B2B] text-[#FAF9F7] px-6 py-3 rounded-full font-medium hover:bg-[#2B2B2B]/90 transition-colors"
        >
          {nextLabelText}
        </button>
      )}
    </div>
  );
}

