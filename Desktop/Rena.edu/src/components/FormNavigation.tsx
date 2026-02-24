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
    <div className="flex items-center justify-between mt-10 pt-6 border-t border-base-dark/10">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`px-6 py-3 rounded-full font-sans text-sm font-medium transition-all duration-300 ${
          isFirstStep
            ? "text-base-dark/30 cursor-not-allowed"
            : "text-base-dark hover:bg-base-light hover:scale-[1.02] active:scale-[0.98]"
        }`}
      >
        {prevLabel}
      </button>

      {isLastStep ? (
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-accent text-white px-6 py-3 rounded-full font-sans text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300 ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {isSubmitting ? submittingText : submitLabelText}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="bg-base-dark text-base-light px-6 py-3 rounded-full font-sans text-sm font-medium tracking-[0.2em] uppercase hover:bg-base-dark/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          {nextLabelText}
        </button>
      )}
    </div>
  );
}

