import { Filter, Plus } from "lucide-react";

export default function DashboardToolbar({ onCreateProject }) {
  return (
    <div className="flex justify-end gap-3 mt-[-15px]">
      <button
        className="
        flex
        items-center
        gap-2
        border
        border-[#E2E8F0]
        bg-white
        px-4
        h-11
        rounded-xl
        hover:bg-slate-50
        transition
        2xl:px-5
        2xl:h-12
        2xl:text-lg
        2xl:font-semibold
        2xl:tracking-wide
        2xl:gap-3
        "
      >
        <Filter size={16} />
        Filters
      </button>

      <button
        onClick={onCreateProject}
        className="
        flex
        items-center
        gap-2
        bg-[#2563EB]
        hover:bg-[#1D4ED8]
        text-white
        px-5
        h-11
        rounded-xl
        font-medium
        transition
        2xl:px-6
        2xl:h-12
        2xl:text-lg
        2xl:font-semibold
        2xl:tracking-wide
        cursor-pointer
        "
      >
        <Plus size={16} />
        Create Project
      </button>
    </div>
  );
}
