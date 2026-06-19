import {
  Bell,
  Building2,
  ChevronDown,
  ClipboardList,
  HelpCircle,
  LayoutDashboard,
  List,
  LogOut,
  Menu,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardHeader = ({
  title,
  subtitle,
  icon,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const fullname = user?.fullname || "Admin";

  const username = user?.username || "admin";

  const role = user?.role || "ADMIN";

  const initials = fullname
    .split(" ")
    .map((name) => name[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/");
  };
  const pageConfig = {
    "/dashboard": {
      title: "Implementation Command Center",
      subtitle: "Real-time visibility across all banks and products",
      icon: <LayoutDashboard size={24} />,
      showFilters: true,

      titleClass: "text-[16px]",
      subtitleClass: "text-[14px]",
    },

    "/tasks": {
      title: "All Tasks",
      subtitle: "View and manage all project tasks",
      icon: <List size={24} />,

      titleClass: "text-[30px]",
      subtitleClass: "text-[18px]",
    },

    "/add-task": {
      title: "Add New Task",
      subtitle: "Create and manage project task",
      icon: <Plus size={24} />,

      titleClass: "text-[42px]",
      subtitleClass: "text-[16px]",
    },

    "/users": {
      title: "Users",
      subtitle: "Create and manage Usera",
      icon: <Plus size={22} />,

      titleClass: "text-[32px]",
      subtitleClass: "text-[17px]",
    },

    "/users/add": {
      title: "Users",
      subtitle: "Create and manage Usera",
      icon: <Plus size={22} />,

      titleClass: "text-[32px]",
      subtitleClass: "text-[17px]",
    },

    "/users/edit": {
      title: "Users",
      subtitle: "Create and manage Usera",
      icon: <Plus size={22} />,

      titleClass: "text-[32px]",
      subtitleClass: "text-[17px]",
    },

    "/audits": {
      title: "Audit Logs",
      subtitle: "View and manage audit logs",
      icon: <ClipboardList size={22} />,

      titleClass: "text-[32px]",
      subtitleClass: "text-[17px]",
    },

    "/authorization": {
      title: "Authorization",
      subtitle: "View and Authorize Requests",
      icon: <ClipboardList size={22} />,

      titleClass: "text-[32px]",
      subtitleClass: "text-[17px]",
    },

    "/create-project": {
      title: "Create New Project",
      subtitle: "Fill in the details to create a new bank project",
      icon: <ClipboardList size={22} />,

      titleClass: "text-[32px]",
      subtitleClass: "text-[17px]",
    },

    "/project-details": {
    title: "Implementation Readiness Dashboard",
    subtitle: "Track Overall Project health and Go-live Readiness",
    icon: <Plus size={24} />,

    titleClass: "text-[26px]",
    subtitleClass: "text-[12px]",
  },
  };

  const location = useLocation();

  const currentPage = pageConfig[location.pathname] || {
    title: "Progress Tracker",
    subtitle: "",
    icon: null,
  };
  return (
    <header className="bg-white border-b border-[#EAEFF5] px-3 sm:px-4 lg:px-8 py-3 lg:py-4">
      <div className="flex flex-col gap-4">
        {/* Top Row */}
        <div className="flex items-start lg:items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              className="lg:hidden flex-shrink-0 mr-4"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} className="text-[#0B1F59]" />
            </button>

            <div
              className="
            w-10 h-10
            sm:w-12 sm:h-12
            rounded-xl
            bg-[#EEF2FF]
            flex
            items-center
            justify-center
            flex-shrink-0
            2xl:w-14 2xl:h-14
          "
            >
              {currentPage.icon}
            </div>

            <div className="min-w-0">
              <h1
                className="
              text-base
              sm:text-xl
              lg:text-[24px]
              font-bold
              xl:text-[20px]
              text-[#0B1F59]
              2xl:text-[32px]
              2xl:font-bold
              2xl:tracking-wide
            "
              >
                {currentPage.title}
              </h1>

              <p
                className="
              hidden
              md:block
              text-sm
              text-[#64748B]
              mt-1
              2xl:text-[17px]
              2xl:font-medium
              2xl:tracking-wide
            "
              >
                {currentPage.subtitle}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
            {location.pathname === "/dashboard" && (
              <>
                {/* Bank Dropdown */}
                <div
                  className="
                hidden xl:flex
                items-center gap-2
                border border-[#E2E8F0]
                rounded-xl
                px-4
                h-11
                bg-white
                2xl:h-12
                2xl:px-5
                2xl:gap-3
              "
                >
                  <Building2
                    size={16}
                    className="text-[#64748B] 2xl:text-xl 2xl:w-5 2xl:h-5"
                  />
                  <select
                    className="
                  outline-none
                  bg-transparent
                  text-sm
                  text-[#0B1F59]
                  2xl:text-[17px]
                  2xl:font-medium
                  2xl:tracking-wide
                "
                  >
                    <option>All Banks</option>
                  </select>
                </div>

                {/* Search */}
                <div
                  className="
                hidden xl:flex
                items-center gap-2
                border border-[#E2E8F0]
                rounded-xl
                px-4
                h-11
                bg-white
                w-[280px]
                2xl:w-[340px]
                2xl:h-12
                2xl:px-5
                2xl:gap-3
              "
                >
                  <Search
                    size={16}
                    className="text-[#94A3B8] 2xl:text-2xl 2xl:w-5 2xl:h-5"
                  />

                  <input
                    type="text"
                    placeholder="Search banks, projects..."
                    className="
                  flex-1
                  outline-none
                  text-sm
                  bg-transparent
                  2xl:text-[17px]
                  2xl:font-medium
                  2xl:tracking-wide
                "
                  />
                </div>
              </>
            )}

            {/* Notification */}
            <button
              className="
            relative
            w-9 h-9
            sm:w-10 sm:h-10
            flex
            items-center
            justify-center
            2xl:w-12 2xl:h-12
          "
            >
              <Bell size={20} className="text-[#0B1F59] 2xl:w-6 2xl:h-6" />

              <span
                className="
              absolute
              -top-1
              -right-1
              w-4 h-4
              sm:w-5 sm:h-5
              rounded-full
              bg-red-500
              text-white
              text-[8px]
              sm:text-[10px]
              font-bold
              flex
              items-center
              justify-center
              2xl:w-5 2xl:h-5
              2xl:text-[10px]
              2xl:font-bold
            "
              >
                5
              </span>
            </button>

            {/* Help */}
            <button
              className="
            hidden sm:flex
            w-10 h-10
            rounded-full
            border border-[#E2E8F0]
            items-center
            justify-center
          "
            >
              <HelpCircle size={18} className="text-[#0B1F59]" />
            </button>

            {/* User */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="
              flex
              items-center
              gap-2
              sm:gap-3
              cursor-pointer
            "
              >
                <div
                  className="
                w-8 h-8
                sm:w-10 sm:h-10
                lg:w-12 lg:h-12
                rounded-full
                bg-[#EEF4FF]
                text-[#2563EB]
                text-xs
                sm:text-sm
                font-bold
                flex
                items-center
                justify-center
                2xl:w-14 2xl:h-14
                2xl:text-lg
                2xl:font-bold
              "
                >
                  {initials}
                </div>

                <div className="hidden lg:block text-left">
                  <h4 className="font-bold text-[#0B1F59] 2xl:text-lg">
                    {fullname}
                  </h4>

                  <p className="text-sm text-[#64748B] 2xl:text-base">
                    {role.replaceAll("_", " ")}
                  </p>
                </div>

                <ChevronDown
                  size={18}
                  className={`
                    cursor-pointer
                  hidden lg:block
                  text-[#0B1F59]
                  transition-transform
                  ${open ? "rotate-180" : ""}
                `}
                />
              </button>

              {open && (
                <div
                  className="
                absolute
                right-0
                top-full
                mt-2
                bg-white
                border
                border-[#EAEFF5]
                rounded-xl
                shadow-lg
                z-[999]
                p-2
                min-w-[140px]
                2xl:min-w-[160px]
                2xl:p-1
              "
                >
                  <button
                    onClick={handleLogout}
                    className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  text-red-600
                  hover:bg-red-100
                  rounded-lg
                  w-full
                  2xl:px-4
                  2xl:py-3
                  2xl:gap-3
                  cursor-pointer
                  2xl:text-lg
                  2xl:font-medium
                  2xl:tracking-wide
                "
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default DashboardHeader;
