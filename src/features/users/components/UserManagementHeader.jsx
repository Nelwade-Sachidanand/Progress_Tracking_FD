import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserManagementHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end mb-4 mt-[-15px]">
      <button
        onClick={() => navigate("/users/add")}
        className="
          h-[44px]
          px-5
          lg:px-6
          rounded-xl

          bg-gradient-to-r
          from-[#7C3AED]
          to-[#A855F7]

          text-white
          font-semibold
          text-[14px]
          lg:text-[15px]

          shadow-lg
          shadow-purple-500/25

          hover:scale-[1.02]
          transition-all
          duration-300

          flex
          items-center
          gap-2

          cursor-pointer
        "
      >
        <Plus size={18} />
        Add User
      </button>
    </div>
  );
};

export default UserManagementHeader;
