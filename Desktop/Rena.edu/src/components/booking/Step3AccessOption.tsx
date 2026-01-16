type FormData = {
  accessOption: string;
  additionalNotes: string;
};

type Step3AccessOptionProps = {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
};

export default function Step3AccessOption({
  formData,
  updateFormData,
}: Step3AccessOptionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-serif font-medium text-[#2B2B2B] mb-2">
          Access Option
        </h2>
        <p className="text-[#2B2B2B]/70 leading-relaxed">
          Select the access option that best fits your needs.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2B2B2B] mb-4">
          Access Option
        </label>
        <div className="space-y-3">
          <label className="flex items-start p-4 border border-[#E8E6E3] rounded-lg cursor-pointer hover:border-[#2B2B2B]/20 transition-colors">
            <input
              type="radio"
              name="accessOption"
              value="flexible"
              checked={formData.accessOption === "flexible"}
              onChange={(e) => updateFormData("accessOption", e.target.value)}
              className="mt-1 mr-3"
            />
            <div>
              <div className="font-medium text-[#2B2B2B]">
                Flexible Access
              </div>
              <div className="text-sm text-[#2B2B2B]/70 mt-1">
                For ad-hoc or short-term use
              </div>
            </div>
          </label>

          <label className="flex items-start p-4 border border-[#E8E6E3] rounded-lg cursor-pointer hover:border-[#2B2B2B]/20 transition-colors">
            <input
              type="radio"
              name="accessOption"
              value="committed"
              checked={formData.accessOption === "committed"}
              onChange={(e) => updateFormData("accessOption", e.target.value)}
              className="mt-1 mr-3"
            />
            <div>
              <div className="font-medium text-[#2B2B2B]">
                Committed Access
              </div>
              <div className="text-sm text-[#2B2B2B]/70 mt-1">
                For weekly or recurring classes
              </div>
            </div>
          </label>

          <label className="flex items-start p-4 border border-[#E8E6E3] rounded-lg cursor-pointer hover:border-[#2B2B2B]/20 transition-colors">
            <input
              type="radio"
              name="accessOption"
              value="resident"
              checked={formData.accessOption === "resident"}
              onChange={(e) => updateFormData("accessOption", e.target.value)}
              className="mt-1 mr-3"
            />
            <div>
              <div className="font-medium text-[#2B2B2B]">
                Resident / Anchor Access
              </div>
              <div className="text-sm text-[#2B2B2B]/70 mt-1">
                For long-term, high-consistency use
              </div>
            </div>
          </label>
        </div>
      </div>

      <div>
        <label
          htmlFor="additionalNotes"
          className="block text-sm font-medium text-[#2B2B2B] mb-2"
        >
          Additional Notes
        </label>
        <textarea
          id="additionalNotes"
          rows={3}
          value={formData.additionalNotes}
          onChange={(e) => updateFormData("additionalNotes", e.target.value)}
          className="w-full px-4 py-3 border border-[#E8E6E3] rounded-lg focus:ring-2 focus:ring-[#FF7A5C] focus:border-transparent bg-[#FAF9F7] text-[#2B2B2B]"
          placeholder="Any additional information or special requirements..."
        />
      </div>
    </div>
  );
}

