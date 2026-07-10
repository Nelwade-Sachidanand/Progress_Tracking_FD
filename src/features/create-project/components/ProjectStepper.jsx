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
        md:grid-cols-3
        xl:grid-cols-6
        gap-2
        mb-4
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
            h-12
            px-3
            rounded-lg
            border
            border-[#CDD7E3]
            transition-all
            duration-200
            cursor-pointer
            text-left

            ${
              currentStep === index
                ? "bg-[#2563EB] border-[#2563EB] text-white shadow-sm"
                : currentStep > index
                  ? "bg-blue-50 border-blue-200 text-[#2563EB]"
                  : "bg-white border-[#CDD7E3] text-slate-700 hover:border-blue-300 hover:bg-slate-50"
            }
          `}
        >
          {/* Step Number */}
          <div
            className={`
              flex
              items-center
              justify-center
              w-5
              h-5
              rounded-full
              text-[11px]
              font-semibold
              flex-shrink-0

              ${
                currentStep === index
                  ? "bg-white text-[#2563EB]"
                  : currentStep > index
                    ? "bg-[#2563EB] text-white"
                    : "bg-slate-200 text-slate-700"
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
              leading-tight
              line-clamp-2
            "
          >
            {step}
          </span>
        </button>
      ))}
    </div>
  );
}
