import { Plus } from "lucide-react";
import { useProjects } from "../../../context/ProjectContext";
import { FolderKanban, ChevronDown } from "lucide-react";

export default function TaskHeader() {

  const {projects} = useProjects();

  const selectedProjectId = sessionStorage.getItem("selectedProjectId");

  const selectedProject = projects.find(
    (project) => String(project.id) === String(selectedProjectId),
  );
  return (
    <div className="flex items-center justify-between mb-3">
      {/* Selected Project Card */}
      <div
  className="
  w-full
  
  border
  border-slate-200
  rounded-2xl
  px-6
  py-4
  shadow-sm
  
     
  mb-2
  bg-[#F8FAFF]
  border
  border-[#E2E8F0]
  rounded-2xl
  
  "
>
  <p className="text-base">
    <span className="font-medium text-slate-600">
    Project :
    </span>{" "}
    <span className="font-semibold text-[#2563EB]">
      {selectedProject
        ? selectedProject.projectName
        : "No Project Selected"}
    </span>
  </p>
</div>
    </div>
  );
}