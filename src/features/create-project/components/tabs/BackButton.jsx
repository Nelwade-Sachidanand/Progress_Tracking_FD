import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton({
  path = "/dashboard",
  label = "Back to Dashboard",
}) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => navigate(path)}
        className="
          flex
          items-center
          gap-2
          text-[#2563EB]
          hover:text-[#1D4ED8]
          text-lg
          font-medium
          cursor-pointer
          transition-colors
        "
      >
        <ArrowLeft size={20} />
        {label}
      </button>
    </div>
  );
}
