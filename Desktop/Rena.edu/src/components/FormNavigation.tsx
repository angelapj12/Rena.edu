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
  variant?: "default" | "typeform";
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
  variant = "default",
}: FormNavigationProps) {
  const t = useTranslations("common");
  
  const prevLabel = previousLabel || t("previous");
  const nextLabelText = nextLabel || t("continue");
  const submitLabelText = submitLabel || t("submitRequest");
  const submittingText = t("submitting");
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const isTypeform = variant === "typeform";

  return (
    <div className={`flex items-center justify-between ${
      isTypeform 
        ? "pt-8 pb-4 md:pt-10 md:pb-6 border-t border-base-dark/10" 
        : "mt-8 pt-4 md:mt-10 md:pt-6 border-t border-base-dark/10"
    }`}>
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`font-sans text-sm font-medium transition-all duration-300 ${
          isTypeform
            ? isFirstStep
              ? "text-base-dark/20 cursor-not-allowed"
              : "text-base-dark/60 hover:text-base-dark"
            : isFirstStep
            ? "text-base-dark/30 cursor-not-allowed px-6 py-3 rounded-full"
            : "text-base-dark hover:bg-base-light hover:scale-[1.02] active:scale-[0.98] px-6 py-3 rounded-full"
        }`}
      >
        {isTypeform ? "← " : ""}{prevLabel}
      </button>

      {isLastStep ? (
        <button
          type="submit"
          disabled={isSubmitting}
          className={`font-sans text-sm font-medium transition-all duration-300 ${
            isTypeform
              ? `bg-base-dark text-base-light px-8 py-3 rounded-full ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-base-dark/90"
                }`
              : `bg-accent text-white px-6 py-3 rounded-full tracking-[0.2em] uppercase ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98]"
                }`
          }`}
        >
          {isSubmitting ? submittingText : submitLabelText}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className={`font-sans text-sm font-medium transition-all duration-300 ${
            isTypeform
              ? "bg-base-dark text-base-light px-8 py-3 rounded-full hover:bg-base-dark/90"
              : "bg-base-dark text-base-light px-6 py-3 rounded-full tracking-[0.2em] uppercase hover:bg-base-dark/90 hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {nextLabelText} →
        </button>
      )}
    </div>
  );
}

