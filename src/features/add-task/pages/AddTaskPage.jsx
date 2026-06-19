import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AddTaskForm from "../components/AddTaskForm";

export default function AddTaskPage() {
  const navigate = useNavigate();
const projectName =
  localStorage.getItem(
    "selectedProjectName"
  ) || "No Project Selected";

  return (
    <div className="p-6">

      <div className="flex items-center gap-4 mb-6">

        <button
          onClick={() =>
            navigate("/tasks")
          }
          className="
          w-10
          h-10
          rounded-xl
          border
          flex
          items-center
          justify-center
          "
        >
          <ArrowLeft size={18} />
        </button>

     <div>
  <h1 className="text-2xl font-bold">
    Add Task
  </h1>

  <p className="text-sm text-gray-500">
    {projectName}
  </p>
</div>

      </div>
<div
  className="
  mb-6
  bg-[#F8FAFF]
  border
  border-[#E2E8F0]
  rounded-2xl
  p-4
  "
>
  <p className="text-sm text-slate-500">
    Selected Project
  </p>

  <h2
    className="
    text-lg
    font-semibold
    text-[#2563EB]
    "
  >
    {projectName}
  </h2>
</div>
      <AddTaskForm />

    </div>
  );
}