type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
  variant?: "default" | "typeform";
};

export default function StepIndicator({
  currentStep,
  totalSteps,
  variant = "default",
}: StepIndicatorProps) {
  if (variant === "typeform") {
    const progress = (currentStep / totalSteps) * 100;
    return (
      <div className="fixed top-16 left-0 right-0 z-40 h-1 bg-base-dark/10">
        <div
          className="h-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }

  return (
    <div className="mb-8 md:mb-12">
      <div className="flex items-center justify-between mb-4">
        {[...Array(totalSteps)].map((_, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    isCompleted
                      ? "bg-base-dark border-base-dark text-base-light"
                      : isActive
                      ? "bg-accent border-accent text-white"
                      : "bg-white border-secondary-light text-base-dark/40"
                  }`}
                >
                  {isCompleted ? "✓" : step}
                </div>
              </div>
              {step < totalSteps && (
                <div
                  className={`h-0.5 flex-1 mx-1 md:mx-2 ${
                    isCompleted ? "bg-base-dark" : "bg-secondary-light"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

