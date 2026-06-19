const steps = [
  "Bank Details",
  "Management Details",
  "CBS & Business Details",
  "CBS Infrastructure",
  "Digital Channels",
  "Payment Systems",
];

export default function ProjectStepper({
  currentStep,
  setCurrentStep,
}) {
  return (
    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-6
      2xl:grid-cols-6
      gap-3
      mb-8
    "
    >
      {steps.map((step, index) => (
        <button
          key={step}
          type="button"
          onClick={() =>
            setCurrentStep(index)
          }
          className={`
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            border
            transition-all
            cursor-pointer

            ${
              currentStep === index
                ? "bg-[#2563EB] border-[#2563EB] text-white shadow-md"
                : currentStep > index
                ? "bg-blue-50 border-blue-200 text-[#2563EB]"
                : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
            }
          `}
        >
          {/* Step Number */}
          <div
            className={`
              w-8
              h-8
              rounded-full
              flex
              items-center
              justify-center
              text-sm
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
            text-sm
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