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
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-serif font-medium text-[#2B2B2B] mb-4">
          Review Your Request
        </h2>
        <div className="bg-[#FAF9F7] p-6 rounded-lg border border-[#E8E6E3] mb-6">
          <p className="text-[#2B2B2B]/80 leading-relaxed">
            Please review your information below. This is a booking request, not
            an instant booking. We'll review your request and get back to you
            shortly to confirm availability and next steps.
          </p>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8E6E3]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-serif font-medium text-[#2B2B2B]">
            Contact Information
          </h3>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="text-sm text-[#2B2B2B]/70 hover:text-[#2B2B2B] underline transition-colors"
          >
            Edit
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium text-[#2B2B2B]/60 mb-1">
              Chinese Name
            </div>
            <div className="text-[#2B2B2B]">
              {formData.chineseLastName} {formData.chineseFirstName}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-[#2B2B2B]/60 mb-1">
              English Name
            </div>
            <div className="text-[#2B2B2B]">
              {formData.englishName || "Not provided"}
            </div>
          </div>
        </div>
      </div>

      {/* Email and Phone Section */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8E6E3]">
        <h3 className="text-xl font-serif font-medium text-[#2B2B2B] mb-4">
          Contact Details
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#2B2B2B] mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              className="w-full px-4 py-3 border border-[#E8E6E3] rounded-lg focus:ring-2 focus:ring-[#FF7A5C] focus:border-transparent bg-[#FAF9F7] text-[#2B2B2B]"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#2B2B2B] mb-2"
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => updateFormData("phone", e.target.value)}
              className="w-full px-4 py-3 border border-[#E8E6E3] rounded-lg focus:ring-2 focus:ring-[#FF7A5C] focus:border-transparent bg-[#FAF9F7] text-[#2B2B2B]"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
      </div>

      {/* Class Details Section */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8E6E3]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-serif font-medium text-[#2B2B2B]">
            Class Details
          </h3>
          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="text-sm text-[#2B2B2B]/70 hover:text-[#2B2B2B] underline transition-colors"
          >
            Edit
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium text-[#2B2B2B]/60 mb-1">
              Class Description
            </div>
            <div className="text-[#2B2B2B]">
              {formData.classDescription || "Not provided"}
            </div>
          </div>
          {formData.preferredTimes && (
            <div>
              <div className="text-sm font-medium text-[#2B2B2B]/60 mb-1">
                Preferred Times
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
            Access Option
          </h3>
          <button
            type="button"
            onClick={() => onEditStep(3)}
            className="text-sm text-[#2B2B2B]/70 hover:text-[#2B2B2B] underline transition-colors"
          >
            Edit
          </button>
        </div>
        <div className="space-y-3">
          {formData.accessOption && (
            <div>
              <div className="text-sm font-medium text-[#2B2B2B]/60 mb-1">
                Access Option
              </div>
              <div className="text-[#2B2B2B] capitalize">
                {formData.accessOption === "flexible"
                  ? "Flexible Access"
                  : formData.accessOption === "committed"
                  ? "Committed Access"
                  : formData.accessOption === "resident"
                  ? "Resident / Anchor Access"
                  : formData.accessOption}
              </div>
            </div>
          )}
          {formData.additionalNotes && (
            <div>
              <div className="text-sm font-medium text-[#2B2B2B]/60 mb-1">
                Additional Notes
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
            Equipment & Technology
          </h3>
          <button
            type="button"
            onClick={() => onEditStep(4)}
            className="text-sm text-[#2B2B2B]/70 hover:text-[#2B2B2B] underline transition-colors"
          >
            Edit
          </button>
        </div>
        <div className="space-y-3">
          {formData.equipment && formData.equipment.length > 0 ? (
            <div>
              <div className="text-sm font-medium text-[#2B2B2B]/60 mb-2">
                Selected Equipment
              </div>
              <div className="space-y-2">
                {formData.equipment.map((equipmentId) => {
                  const equipmentLabels: { [key: string]: string } = {
                    projector: "Projector & Screen",
                    whiteboard: "Whiteboard",
                    "desks-chairs": "Desks and Chairs",
                    "workout-mats": "Workout Mats",
                    "yoga-blocks": "Yoga Blocks",
                    "sound-system": "Sound System / Speakers",
                    microphone: "Microphone",
                    "laptop-computer": "Laptop / Computer",
                    printer: "Printer",
                    tables: "Tables",
                    storage: "Storage Cabinets",
                    none: "No additional equipment needed",
                  };
                  return (
                    <div key={equipmentId} className="text-[#2B2B2B]">
                      • {equipmentLabels[equipmentId] || equipmentId}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-[#2B2B2B]/60">No equipment selected</div>
          )}
        </div>
      </div>
    </div>
  );
}

