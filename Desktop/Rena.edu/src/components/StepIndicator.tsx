type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  return (
    <div className="mb-12">
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
                      ? "bg-[#2B2B2B] border-[#2B2B2B] text-[#FAF9F7]"
                      : isActive
                      ? "bg-[#FF7A5C] border-[#FF7A5C] text-white"
                      : "bg-white border-[#E8E6E3] text-[#2B2B2B]/40"
                  }`}
                >
                  {isCompleted ? "✓" : step}
                </div>
              </div>
              {step < totalSteps && (
                <div
                  className={`h-0.5 flex-1 mx-2 ${
                    isCompleted ? "bg-[#2B2B2B]" : "bg-[#E8E6E3]"
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

