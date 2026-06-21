const steps = [
  "Bank Details",
  "Management Details",
  "CBS & Business Details",
  "CBS Infrastructure",
  "Digital Channels",
  "Payment Systems",
];

export default function ProjectStepper({ currentStep, setCurrentStep }) {
  return (
    <div
      className="
      grid
      grid-cols-2
      lg:grid-cols-6
      gap-2
      mb-6
    "
    >
      {steps.map((step, index) => (
        <button
          key={step}
          type="button"
          onClick={() => setCurrentStep(index)}
          className={`
            flex
            items-center
            gap-2
            px-3
            py-2
            rounded-lg
            border
            transition-all
            cursor-pointer
            min-h-[58px]

            ${
              currentStep === index
                ? "bg-[#2563EB] border-[#2563EB] text-white shadow-sm"
                : currentStep > index
                  ? "bg-blue-50 border-blue-200 text-[#2563EB]"
                  : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
            }
          `}
        >
          {/* Step Number */}
          <div
            className={`
              w-6
              h-6
              rounded-full
              flex
              items-center
              justify-center
              text-xs
              font-bold
              flex-shrink-0

              ${
                currentStep === index
                  ? "bg-white text-[#2563EB]"
                  : currentStep > index
                    ? "bg-[#2563EB] text-white"
                    : "bg-slate-200 text-slate-600"
              }
            `}
          >
            {index + 1}
          </div>

          {/* Step Name */}
          <span
            className="
            text-xs
            font-medium
            text-left
            leading-tight
          "
          >
            {step}
          </span>
        </button>
      ))}
    </div>
  );
}
