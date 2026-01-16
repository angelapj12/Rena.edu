type FormData = {
  chineseLastName: string;
  chineseFirstName: string;
  englishName: string;
};

type Step1ContactProps = {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
};

export default function Step1Contact({
  formData,
  updateFormData,
}: Step1ContactProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-serif font-medium text-[#2B2B2B] mb-2">
          Your Name
        </h2>
        <p className="text-[#2B2B2B]/70 leading-relaxed">
          Please provide your name information.
        </p>
      </div>

      <div>
        <label
          htmlFor="chineseLastName"
          className="block text-sm font-medium text-[#2B2B2B] mb-2"
        >
          Chinese Last Name
        </label>
        <input
          type="text"
          id="chineseLastName"
          required
          value={formData.chineseLastName}
          onChange={(e) => updateFormData("chineseLastName", e.target.value)}
          className="w-full px-4 py-3 border border-[#E8E6E3] rounded-lg focus:ring-2 focus:ring-[#FF7A5C] focus:border-transparent bg-[#FAF9F7] text-[#2B2B2B]"
          placeholder="王"
        />
      </div>

      <div>
        <label
          htmlFor="chineseFirstName"
          className="block text-sm font-medium text-[#2B2B2B] mb-2"
        >
          Chinese First Name
        </label>
        <input
          type="text"
          id="chineseFirstName"
          required
          value={formData.chineseFirstName}
          onChange={(e) => updateFormData("chineseFirstName", e.target.value)}
          className="w-full px-4 py-3 border border-[#E8E6E3] rounded-lg focus:ring-2 focus:ring-[#FF7A5C] focus:border-transparent bg-[#FAF9F7] text-[#2B2B2B]"
          placeholder="小明"
        />
      </div>

      <div>
        <label
          htmlFor="englishName"
          className="block text-sm font-medium text-[#2B2B2B] mb-2"
        >
          English Name
        </label>
        <input
          type="text"
          id="englishName"
          required
          value={formData.englishName}
          onChange={(e) => updateFormData("englishName", e.target.value)}
          className="w-full px-4 py-3 border border-[#E8E6E3] rounded-lg focus:ring-2 focus:ring-[#FF7A5C] focus:border-transparent bg-[#FAF9F7] text-[#2B2B2B]"
          placeholder="John Doe"
        />
      </div>
    </div>
  );
}

