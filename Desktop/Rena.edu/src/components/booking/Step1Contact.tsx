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
        <h2 className="text-h2-compact text-base-dark mb-2">
          Your Name
        </h2>
        <p className="text-body-lg text-base-dark/70">
          Please provide your name information.
        </p>
      </div>

      <div>
        <label
          htmlFor="chineseLastName"
          className="block text-sm font-medium text-base-dark mb-2"
        >
          Chinese Last Name
        </label>
        <input
          type="text"
          id="chineseLastName"
          required
          value={formData.chineseLastName}
          onChange={(e) => updateFormData("chineseLastName", e.target.value)}
          className="w-full px-4 py-3 border border-secondary-light rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-base-light-subtle text-base-dark"
          placeholder="王"
        />
      </div>

      <div>
        <label
          htmlFor="chineseFirstName"
          className="block text-sm font-medium text-base-dark mb-2"
        >
          Chinese First Name
        </label>
        <input
          type="text"
          id="chineseFirstName"
          required
          value={formData.chineseFirstName}
          onChange={(e) => updateFormData("chineseFirstName", e.target.value)}
          className="w-full px-4 py-3 border border-secondary-light rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-base-light-subtle text-base-dark"
          placeholder="小明"
        />
      </div>

      <div>
        <label
          htmlFor="englishName"
          className="block text-sm font-medium text-base-dark mb-2"
        >
          English Name
        </label>
        <input
          type="text"
          id="englishName"
          required
          value={formData.englishName}
          onChange={(e) => updateFormData("englishName", e.target.value)}
          className="w-full px-4 py-3 border border-secondary-light rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-base-light-subtle text-base-dark"
          placeholder="John Doe"
        />
      </div>
    </div>
  );
}

