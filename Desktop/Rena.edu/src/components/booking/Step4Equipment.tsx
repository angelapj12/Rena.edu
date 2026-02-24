"use client";

import { useTranslations } from "next-intl";

type FormData = {
  equipment: string[];
};

type Step4EquipmentProps = {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string[]) => void;
};

export default function Step4Equipment({
  formData,
  updateFormData,
}: Step4EquipmentProps) {
  const t = useTranslations("booking.step4");
  
  const equipmentOptions = [
    { id: "projector" },
    { id: "whiteboard" },
    { id: "desks-chairs" },
    { id: "workout-mats" },
    { id: "yoga-blocks" },
    { id: "sound-system" },
    { id: "microphone" },
    { id: "laptop-computer" },
    { id: "printer" },
    { id: "tables" },
    { id: "storage" },
    { id: "none" },
  ];
  const handleEquipmentChange = (equipmentId: string, checked: boolean) => {
    if (equipmentId === "none") {
      // If "none" is selected, clear all other selections
      updateFormData("equipment", checked ? ["none"] : []);
    } else {
      // Remove "none" if any other option is selected
      const currentEquipment = formData.equipment.filter((e) => e !== "none");
      if (checked) {
        updateFormData("equipment", [...currentEquipment, equipmentId]);
      } else {
        updateFormData("equipment", currentEquipment.filter((e) => e !== equipmentId));
      }
    }
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {equipmentOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center p-3 border border-secondary-light rounded-lg cursor-pointer hover:border-base-dark/20 transition-colors"
            >
              <input
                type="checkbox"
                checked={formData.equipment.includes(option.id)}
                onChange={(e) =>
                  handleEquipmentChange(option.id, e.target.checked)
                }
                className="mr-3"
              />
              <span className="text-base-dark font-medium text-sm">
                {t(`equipment.${option.id}`)}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

