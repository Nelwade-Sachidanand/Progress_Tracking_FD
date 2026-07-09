import {
  ArrowRight,
  Bell,
  Building2,
  ChevronDown,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  FolderKanban,
  LayoutDashboard,
  List,
  LogOut,
  Menu,
  Pencil,
  Plus,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import {
  getNotifications,
  getUnreadCount,
  markAllRead,
  markAsRead,
} from "../../services/notificationService";
import MultiSelectDropdown from "../common/MultiSelectDropdown";

const DashboardHeader = ({
  title,
  subtitle,
  icon,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);

  const notificationRef = useRef(null);
  const notificationButtonRef = useRef(null);

  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);

  const [selectedBanks, setSelectedBanks] = useState(() => {
    const saved = sessionStorage.getItem("selectedBanks");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchText, setSearchText] = useState("");

  const { projects, setProjects } = useProjects();

  const banks = [
    ...new Set(projects.map((p) => p.bankName).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    sessionStorage.setItem("selectedBanks", JSON.stringify(selectedBanks));

    window.dispatchEvent(
      new CustomEvent("bankChanged", {
        detail: selectedBanks,
      }),
    );
  }, [selectedBanks]);

  const user = JSON.parse(sessionStorage.getItem("user"));

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
    setProjects([]);
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    const handleSearchChange = (e) => {
      setSearchText(e.detail);
    };

    window.addEventListener("dashboardSearch", handleSearchChange);

    return () =>
      window.removeEventListener("dashboardSearch", handleSearchChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const loadNotifications = async () => {
    try {
      const notificationsRes = await getNotifications();

      console.log(notificationsRes);

      const countRes = await getUnreadCount();

      setNotifications(notificationsRes.details);

      setUnreadCount(countRes.details);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        notificationButtonRef.current &&
        !notificationButtonRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatAction = (value = "") => {
    return value
      .split(/([_\s])/)
      .map((part) => {
        if (part === "_" || part === " ") return part;
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      })
      .join("");
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllRead();

      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          read: true,
        })),
      );

      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all notifications as read", error);
    }
  };

  const formatTimeAgo = (date) => {
    const diff = (new Date() - new Date(date)) / 1000;

    if (diff < 60) return `${Math.floor(diff)} sec ago`;

    if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;

    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;

    return `${Math.floor(diff / 86400)} days ago`;
  };

  const pageConfig = {
    "/dashboard": {
      title: "Implementation Command Center",
      subtitle: "Real-Time Visibility Across All Banks And Products",
      icon: <LayoutDashboard size={24} />,
      showFilters: true,

      titleClass: "text-[16px]",
      subtitleClass: "text-[14px]",
    },

    "/milestones": {
      title: "Milestone Management ",
      subtitle: "Manage Milestone Weightages For Selected Bank",
      icon: <LayoutDashboard size={24} />,
      showFilters: true,

      titleClass: "text-[16px]",
      subtitleClass: "text-[14px]",
    },

    "/tasks": {
      title: "All Tasks",
      subtitle: "View And Manage All Project Tasks",
      icon: <List size={24} />,

      titleClass: "text-[30px]",
      subtitleClass: "text-[18px]",
    },

    "/tasks/add-task": {
      title: "Activity Creation Form",
      subtitle: "Define Project Execution Activities",

      icon: <Plus size={24} />,

      titleClass: "text-[30px]",
      subtitleClass: "text-[12px]",
    },
    "/edit-task": {
      title: "Activity Update Form",
      subtitle: "Modify Project Activity Details",
      icon: <Pencil size={24} />,
      titleClass: "text-[30px]",
      subtitleClass: "text-[12px]",
    },

    "/users": {
      title: "Users",
      subtitle: "Create And Manage Users",
      icon: <Users size={22} />,

      titleClass: "text-[32px]",
      subtitleClass: "text-[17px]",
    },

    "/users/add": {
      title: "Users",
      subtitle: "Create And Manage Users",
      icon: <User size={22} />,

      titleClass: "text-[32px]",
      subtitleClass: "text-[17px]",
    },

    "/users/edit": {
      title: "Users",
      subtitle: "Create And Manage Users",
      icon: <User size={22} />,

      titleClass: "text-[32px]",
      subtitleClass: "text-[17px]",
    },

    "/audits": {
      title: "Audit Logs",
      subtitle: "View And Manage Audit Logs",
      icon: <ClipboardList size={22} />,

      titleClass: "text-[32px]",
      subtitleClass: "text-[17px]",
    },

    "/authorization": {
      title: "Authorization",
      subtitle: "View And Authorize Requests",
      icon: <ShieldCheck size={22} />,

      titleClass: "text-[32px]",
      subtitleClass: "text-[17px]",
    },

    "/create-project": {
      title: "Create New Project",
      subtitle: "Fill In The Details To Create A New Bank Project",
      icon: <ClipboardList size={22} />,

      titleClass: "text-[32px]",
      subtitleClass: "text-[17px]",
    },

    "/project-details": {
      title: "Implementation Readiness Dashboard",
      subtitle: "Track Overall Project Health And Go-live Readiness",
      icon: <LayoutDashboard size={24} />,

      titleClass: "text-[26px]",
      subtitleClass: "text-[12px]",
    },
    "/documents": {
      title: "Documents",
      subtitle: "Manage Project Sign-off Documents ",
      icon: <FileText size={24} />,

      titleClass: "text-[26px]",
      subtitleClass: "text-[12px]",
    },

    "/notifications": {
      title: "Notifications",
      subtitle: "View And Manage All System Notifications And Activity Updates",
      icon: <Bell size={24} />,

      titleClass: "text-[26px]",
      subtitleClass: "text-[12px]",
    },

    "/documents": {
      title: "Documents",
      subtitle: "Upload And Manage Signoff Documents",
      icon: <Users size={22} />,

      titleClass: "text-[32px]",
      subtitleClass: "text-[17px]",
    },

    "/upload-excel": {
      title: "Upload Excel",
      // subtitle: "Upload Excel files to create or update project information",
      icon: <FileSpreadsheet size={24} />,

      titleClass: "text-[26px]",
      subtitleClass: "text-[12px]",
    },

    "/projects": {
      title: "Projects",
      subtitle: "Manage All Projects",
      icon: <FolderKanban size={24} />,

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
        <div className="flex items-start lg:items-center justify-between gap-4 ">
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
          <div
            className="
            flex
            items-center
            justify-end
            gap-2
            lg:gap-4
          "
          >
            {" "}
            {location.pathname === "/dashboard" && (
              <>
                {/* Bank Dropdown */}
                <MultiSelectDropdown
                  label=""
                  placeholder="All Banks"
                  options={banks}
                  selected={selectedBanks}
                  onChange={setSelectedBanks}
                  icon={Building2}
                  width="w-[260px]"
                />

                {/* Search */}
                {/* <div
                  className="
                hidden xl:flex
                items-center gap-2
                border border-[#E2E8F0]
                rounded-xl
                px-4
                h-11
                bg-white
                w-[200px]
                2xl:w-[340px]
                2xl:h-12
                2xl:px-5
                2xl:gap-3
              outline-none
              focus-within:border-blue-500
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
                    onChange={(e) => {
                      window.dispatchEvent(
                        new CustomEvent("dashboardSearch", {
                          detail: e.target.value,
                        }),
                      );
                    }}
                  />
                </div> */}
              </>
            )}
            {/* Notification */}
            {location.pathname !== "/notifications" && (
              <div className="relative">
                <button
                  ref={notificationButtonRef}
                  data-testid="notification-button"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="
                  relative
                  w-10
                  h-10
                  2xl:w-12
                  2xl:h-12
                  flex
                  items-center
                  justify-center
                "
                >
                  <Bell
                    size={20}
                    className="text-[#0B1F59] cursor-pointer 2xl:size-8"
                  />

                  {unreadCount > 0 && (
                    <span
                      className="
                    absolute
                    -top-1
                    -right-1
                    w-5
                    h-5
                    2xl:w-6
                    2xl:h-6
                    rounded-full
                    bg-red-500
                    text-white
                    text-[10px]
                    font-bold
                    flex
                    items-center
                    justify-center
                  "
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div
                    ref={notificationRef}
                    className="
                  absolute
                  right-0
                  lg:right-[-80px]
                  xl:right-[-120px]
                  top-14
                  w-[92vw]
                  max-w-[420px]
                  sm:w-[380px]
                  lg:w-[420px]
                  bg-white
                  rounded-3xl
                  border
                  border-slate-200
                  shadow-2xl
                  overflow-hidden
                  z-[9999]
                "
                  >
                    {/* Header */}
                    <div
                      className="
                    flex
                    items-center
                    justify-between
                    px-6
                    py-5
                    border-b
                  "
                    >
                      <h3
                        className="
                      xl:text-[16px]
                      2xl:text-[18px]
                      font-bold
                      text-[#0B1F59]
                      "
                      >
                        Notifications ({unreadCount})
                      </h3>

                      <button
                        onClick={async () => {
                          try {
                            await markAllRead();
                            loadNotifications();
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                        className="
                      text-[#2563EB]
                      font-medium
                      hover:underline
                      xl:text-[15px]
                      2xl:text-[17px]
                      cursor-pointer
                    "
                      >
                        Mark all as read
                      </button>
                    </div>

                    {/* Body */}
                    <div className="max-h-[600px] overflow-y-auto">
                      {!notifications || notifications.length === 0 ? (
                        <div className="p-10 text-center text-slate-500">
                          No Notifications
                        </div>
                      ) : (
                        notifications.slice(0, 2).map((notification) => (
                          <div
                            key={notification.id}
                            onClick={async () => {
                              if (!notification.read) {
                                await markAsRead(notification.id);
                                loadNotifications();
                              }

                              if (notification.redirectUrl) {
                                navigate(notification.redirectUrl);
                              }

                              setShowNotifications(false);
                            }}
                            className="
                            flex
                            gap-3
                            p-4
                            border-b
                            cursor-pointer
                            hover:bg-slate-50
                            transition
                            overflow-hidden
                          "
                          >
                            <div
                              className="
                              w-11
                              h-11
                              rounded-xl
                              bg-[#EEF2FF]
                              flex
                              items-center
                              justify-center
                              flex-shrink-0
                            "
                            >
                              <Bell size={20} className="text-[#4F46E5]" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between">
                                <h4
                                  className="
                                  font-bold
                                  text-[14px]
                                  lg:text-[15px]
                                  text-[#0B1F59]
                                  break-words
                                  leading-5
                                "
                                >
                                  {notification.title}
                                </h4>

                                {!notification.read && (
                                  <div
                                    className="
                                    w-3
                                    h-3
                                    rounded-full
                                    bg-red-500
                                    mt-1
                                  "
                                  />
                                )}
                              </div>

                              <p
                                className="
                                text-[#475569]
                                text-[12px]
                                lg:text-[13px]
                                mt-1
                                leading-5
                                break-words
                                whitespace-normal
                              "
                              >
                                {notification.message}
                              </p>

                              <p
                                className="
                                text-[#94A3B8]
                                text-sm
                                mt-2
                              "
                              >
                                {formatTimeAgo(notification.createdAt)}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-1 flex items-center justify-center">
                      <button
                        onClick={() => {
                          navigate("/notifications");

                          setShowNotifications(false);
                        }}
                        className="
                      w-[120px]
                      py-2
                      rounded-2xl
                      bg-[#F8FAFC]
                      hover:bg-[#EEF2FF]
                      text-[#2563EB]
                      font-semibold
                      flex
                      items-center
                      justify-center
                      gap-2
                      cursor-pointer
                      "
                      >
                        View All
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* User */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="
                flex
                items-center
                gap-2
                sm:gap-3
                cursor-pointer
                min-w-0
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

                <div className="hidden lg:block text-left min-w-0">
                  <h4
                    className="
                    font-bold
                    text-[#0B1F59]
                    2xl:text-lg
                    truncate
                    max-w-[140px]
                    xl:max-w-[180px]
                    2xl:max-w-[220px]
                  "
                    title={fullname}
                  >
                    {fullname}
                  </h4>

                  <p
                    className="
                    text-sm
                    text-[#64748B]
                    2xl:text-base
                    truncate
                    max-w-[140px]
                    xl:max-w-[180px]
                    2xl:max-w-[220px]
                  "
                  >
                    {formatAction(role)}
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
