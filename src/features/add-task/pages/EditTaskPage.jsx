import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditTaskForm from "../components/EditTaskForm";

export default function EditTaskPage() {
  const navigate = useNavigate();

  return (
    <div className="p-6">

      <div className="flex items-center gap-4 mb-6">

        <button
          onClick={() => navigate("/tasks")}
          className="
          w-10 h-10
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
            Edit Task
          </h1>

          <p className="text-sm text-gray-500">
            Update activity details
          </p>
        </div>

      </div>

      <EditTaskForm />

    </div>
  );
}