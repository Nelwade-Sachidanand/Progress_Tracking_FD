import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserManagementHeader = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
      rounded-[20px]
      bg-gradient-to-r
      from-[#001B5E]
      via-[#1144A8]
      to-[#2B78FF]

      px-4
      sm:px-6
      lg:px-8

      py-5

      flex
      flex-col
      md:flex-row

      md:items-center
      md:justify-between

      gap-4

      shadow-md
      mt-[-15px]
      "
    >
      {/* Left Content */}
      <div>
        <h1
          className="
          text-white
          text-[24px]
          sm:text-[28px]
          lg:text-[32px]
          font-[700]
          leading-tight
          2xl:text-[36px]
          2xl:font-[700]
          2xl:tracking-wide
          "
        >
          User Management
        </h1>

        <p
          className="
          text-white/90
          text-[13px]
          sm:text-[14px]
          lg:text-[15px]
          mt-2
          2xl:text-[16px]
          2xl:font-medium
          2xl:tracking-wide
          "
        >
          Manage system users, roles, and permissions
        </p>
      </div>

      {/* Button */}
      <button
        onClick={() => navigate("/users/add")}
        className="
        h-[44px]

        w-full
        md:w-auto

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
        justify-center
        gap-2

        cursor-pointer
        2xl:text-[16px]
        "
      >
        <Plus size={18} />
        Add User
      </button>
    </div>
  );
};

export default UserManagementHeader;
