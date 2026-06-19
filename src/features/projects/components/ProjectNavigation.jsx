export default function ProjectNavigation({
    currentStep,
    setCurrentStep,
}) {
    const totalSteps = 6;

    return (
        <div
            className="
            flex
            justify-between
            items-center
            mt-8
            pt-6
            border-t
            border-slate-200
            "
        >
            <button
                disabled={currentStep === 0}
                onClick={() =>
                    setCurrentStep(currentStep - 1)
                }
                className="
                px-5
                h-11
                border
                border-slate-300
                rounded-xl
                disabled:opacity-50
                "
            >
                Previous
            </button>

            <div className="flex gap-3">
                <button
                    className="
                    px-5
                    h-11
                    border
                    border-slate-300
                    rounded-xl
                    "
                >
                    Save Draft
                </button>

                <button
                    onClick={() =>
                        setCurrentStep(
                            Math.min(
                                currentStep + 1,
                                totalSteps - 1
                            )
                        )
                    }
                    className="
                    px-5
                    h-11
                    rounded-xl
                    bg-[#2563EB]
                    text-white
                    "
                >
                    {currentStep === totalSteps - 1
                        ? "Create Project"
                        : "Next"}
                </button>
            </div>
        </div>
    );
}