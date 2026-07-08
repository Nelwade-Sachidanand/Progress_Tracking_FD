import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddTaskForm from "../components/AddTaskForm";

export default function AddTaskPage() {
  const navigate = useNavigate();
  const projectName =
    sessionStorage.getItem("selectedProjectName") || "No Project Selected";

  return (
    <div className="p-4 sm:p-6">
      {/* Header - No Wrap */}
      <div className="flex items-center justify-between gap-3 mb-6 mt-[-10px]">
        {/* Left Section - Back Button + Title */}
        <div className="flex items-center gap-3  min-w-0 flex-1">
          <button
            onClick={() => navigate("/tasks")}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors shrink-0"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="min-w-0">
            <h1 className="text-base sm:text-xl md:text-xl font-bold truncate">
              Add Task
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 truncate mt-[-3px]">
              Create And Manage Project Task
            </p>
          </div>
        </div>

        {/* Right Section - Project Badge */}
        <div className="shrink-0 ml-2">
          <div className="bg-[#F0F4FF] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl flex items-center gap-1.5 sm:gap-2 border border-[#E2E8F0]">
            <span className="text-xs sm:text-sm text-slate-500 hidden xs:inline">
              Project:
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#2563EB] truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">
              Acive Project: {projectName}
            </span>
          </div>
        </div>
      </div>

      <AddTaskForm />
    </div>
  );
}
