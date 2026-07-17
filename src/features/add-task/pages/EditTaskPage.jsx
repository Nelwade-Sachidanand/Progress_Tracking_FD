import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditTaskForm from "../components/EditTaskForm";

export default function EditTaskPage() {
  const navigate = useNavigate();
  const projectName =
    sessionStorage.getItem("selectedProjectName") || "No Project Selected";
  return (
    <div className="p-6 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-6">
        {/* Left Section */} 
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <button
            onClick={() => navigate("/tasks")}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors shrink-0"

          >
            <ArrowLeft size={18} />
          </button>

          <div className="min-w-0">
            <h1 className="text-base sm:text-xl md:text-2xl font-bold truncate">
              Edit Activity
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 truncate">
              Update activity details
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="shrink-0 ml-2">
          <div className="bg-[#F0F4FF] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl flex items-center gap-1.5 sm:gap-2 border border-[#E2E8F0]">
            <span className="text-xs sm:text-sm text-slate-500 hidden xs:inline">
              Project:
            </span>

            <span className="text-xs sm:text-sm font-semibold text-[#2563EB] truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">
              Active Project: {projectName}
            </span>
          </div>
        </div>
      </div>

      <EditTaskForm />
    </div>
  );
}
