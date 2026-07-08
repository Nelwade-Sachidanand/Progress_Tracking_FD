import { toast } from "react-toastify";
import useCreateProject from "../hooks/useCreateProject";
import { mapProjectPayload } from "../utils/projectMapper";

export default function ProjectNavigation({
  currentStep,
  setCurrentStep,
  formData,
  resetForm,
  setSelectedProjectId,
  loadProjectInformation,
}) {
  const { saveProject, loading } = useCreateProject();

  const totalSteps = 6;

  const handleCreateProject = async () => {
    const payload = mapProjectPayload(formData);

    const response = await saveProject(payload);

    if (response.statusType === "S") {
      // Remove saved draft
      sessionStorage.removeItem("projectDraft");

      // Reset form
      resetForm();

      // Reset selected project
      setSelectedProjectId("");

      // Go back to first step
      setCurrentStep(0);

      // Reload project list
      await loadProjectInformation();
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handleSaveDraft = () => {
    sessionStorage.setItem("projectDraft", JSON.stringify(formData));

    toast.success("Draft Saved Successfully");
  };

  return (
    <div
      className="
        mt-5
        border-t
        border-slate-200
        pt-4
      "
    >
      <div
        className="
          flex
          flex-wrap
          items-center
          justify-between
          gap-3
        "
      >
        {/* Previous Button */}

        <button
          type="button"
          disabled={currentStep === 0}
          onClick={handlePrevious}
          className="
            h-10
            rounded-lg
            border
            border-slate-300
            bg-white
            px-5
            text-sm
            font-medium
            text-slate-700
            transition-all
            duration-200
            hover:bg-slate-100
            disabled:cursor-not-allowed
            disabled:opacity-50
            cursor-pointer
          "
        >
          Previous
        </button>

        {/* Right Buttons */}

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveDraft}
            type="button"
            className="
              h-10
              rounded-lg
              border
              border-slate-300
              bg-white
              px-5
              text-sm
              font-medium
              text-slate-700
              transition-all
              duration-200
              hover:bg-slate-100
              cursor-pointer
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
              flex
              h-10
              min-w-[150px]
              items-center
              justify-center
              rounded-lg
              bg-[#2563EB]
              px-6
              text-sm
              font-medium
              text-white
              transition-all
              duration-200
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-50
              cursor-pointer
            "
          >
            {loading
              ? "Please wait..."
              : currentStep === totalSteps - 1
                ? "Create Project"
                : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
