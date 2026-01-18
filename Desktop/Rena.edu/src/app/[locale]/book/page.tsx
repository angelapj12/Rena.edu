"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StepIndicator from "@/components/StepIndicator";
import FormNavigation from "@/components/FormNavigation";
import Step1Contact from "@/components/booking/Step1Contact";
import Step2ClassDetails from "@/components/booking/Step2ClassDetails";
import Step3AccessOption from "@/components/booking/Step3AccessOption";
import Step4Equipment from "@/components/booking/Step4Equipment";
import Step5Review from "@/components/booking/Step4Review";
import Confirmation from "@/components/booking/Confirmation";
import { supabase } from "@/lib/supabase";
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

export default function BookPage() {
  const t = useTranslations("booking.step5");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    chineseLastName: "",
    chineseFirstName: "",
    englishName: "",
    email: "",
    phone: "",
    classDescription: "",
    preferredTimes: "",
    accessOption: "",
    additionalNotes: "",
    equipment: [],
  });

  const totalSteps = 5;

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { data, error } = await supabase
        .from('booking_requests')
        .insert([
          {
            chinese_last_name: formData.chineseLastName,
            chinese_first_name: formData.chineseFirstName,
            english_name: formData.englishName,
            email: formData.email,
            phone: formData.phone,
            class_description: formData.classDescription,
            preferred_times: formData.preferredTimes || null,
            access_option: formData.accessOption || null,
            additional_notes: formData.additionalNotes || null,
            equipment: formData.equipment || [],
            status: 'submitted',
          },
        ])
        .select();

      if (error) {
        throw error;
      }

      console.log('Booking request saved:', data);
      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Error submitting booking request:', error);
      setSubmitError(
        error?.message || 'Failed to submit booking request. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Contact
            formData={{
              chineseLastName: formData.chineseLastName,
              chineseFirstName: formData.chineseFirstName,
              englishName: formData.englishName,
            }}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <Step2ClassDetails
            formData={{
              classDescription: formData.classDescription,
              preferredTimes: formData.preferredTimes,
            }}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <Step3AccessOption
            formData={{
              accessOption: formData.accessOption,
              additionalNotes: formData.additionalNotes,
            }}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <Step4Equipment
            formData={{
              equipment: formData.equipment,
            }}
            updateFormData={updateFormData}
          />
        );
      case 5:
        return (
          <Step5Review
            formData={formData}
            onEditStep={goToStep}
            updateFormData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  // Show confirmation screen after submission
  if (isSubmitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#FAF9F7] py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-10 rounded-2xl border border-[#E8E6E3]">
              <Confirmation
                name={formData.englishName || formData.chineseFirstName || ""}
              />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF9F7] py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          <div className="bg-white p-10 rounded-2xl border border-[#E8E6E3]">
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{submitError}</p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              {renderCurrentStep()}

              <FormNavigation
                currentStep={currentStep}
                totalSteps={totalSteps}
                onPrevious={prevStep}
                onNext={nextStep}
                isSubmitting={isSubmitting}
              />
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
