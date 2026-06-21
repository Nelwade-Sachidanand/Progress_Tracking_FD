import useCreateProject from "../hooks/useCreateProject";
import { mapProjectPayload } from "../utils/projectMapper";

export default function ProjectNavigation({
  currentStep,
  setCurrentStep,
  formData,
  resetForm,
}) {
  const { saveProject, loading } = useCreateProject();

  const handleCreateProject = async () => {
    const payload = mapProjectPayload(formData);

    const response = await saveProject(payload);
    if (response.statusType === "S") {
      resetForm();
    }
  };

  const totalSteps = 6;

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  return (
    <>
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
        {/* Previous Button */}
        <button
          type="button"
          disabled={currentStep === 0}
          onClick={handlePrevious}
          className="
          px-5
          h-11
          border
          border-slate-300
          rounded-xl
          cursor-pointer
          hover:bg-slate-100
          transition-all
          duration-200
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
        >
          Previous
        </button>

        {/* Right Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            className="
            px-5
            h-11
            border
            border-slate-300
            rounded-xl
            cursor-pointer
            hover:bg-slate-100
            transition-all
            duration-200
          "
          >
            Save Draft
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={
              currentStep === totalSteps - 1 ? handleCreateProject : handleNext
            }
            className="
            px-5
            h-11
            rounded-xl
            bg-[#2563EB]
            text-white
            cursor-pointer
            hover:bg-blue-700
            transition-all
            duration-200
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
          >
            {currentStep === totalSteps - 1 ? "Create Project" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
}
