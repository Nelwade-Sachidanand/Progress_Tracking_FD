import {
  AlertTriangle,
  Building2,
  CheckSquare,
  ClipboardList,
  FileBarChart,
  FileText,
  Flag,
  FolderKanban,
  Headphones,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

import { NavLink } from "react-router-dom";
import logo from "../../assets/images/suite1.png";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user?.role;

  const isUser = role === "USER";
  const isAdmin = role === "ADMIN";
  const isManagement = role === "MANAGEMENT USER";
  const isImplementation = role === "IMPLEMENTATION USER";
  const canUploadExcel = isAdmin || isImplementation;

  const menuGroups = [
    {
      title: "PROJECT MANAGEMENT",
      items: isUser
        ? [
            {
              name: "Dashboard",
              icon: LayoutDashboard,
              path: "/project-details",
            },
            {
              name: "Tasks",
              icon: CheckSquare,
              path: "/tasks",
            },
            {
              name: "Documents",
              icon: FileText,
              path: "/documents",
            },
          ]
        : [
            {
              name: "Dashboard",
              icon: LayoutDashboard,
              path: "/dashboard",
            },
            {
              name: "Banks / Clients",
              icon: Building2,
              path: "/banks",
            },
            {
              name: "Products",
              icon: Package,
              path: "/products",
            },
            {
              name: "Projects",
              icon: FolderKanban,
              path: "/projects",
            },
            ...(canUploadExcel
              ? [
                  {
                    name: "Upload Excel",
                    icon: Upload,
                    path: "/upload-excel",
                  },
                ]
              : []),
            {
              name: "Milestones",
              icon: Flag,
              path: "/milestones",
            },
            {
              name: "Tasks",
              icon: CheckSquare,
              path: "/tasks",
            },
          ],
    },

    ...(isAdmin || isManagement || isImplementation
      ? [
          {
            title: "MONITORING",
            items: [
              {
                name: "Issues",
                icon: AlertTriangle,
                path: "/issues",
              },
              {
                name: "Risks",
                icon: ShieldAlert,
                path: "/risks",
              },
              // {
              //   name: "Reports",
              //   icon: FileBarChart,
              //   path: "/reports",
              // },
              {
                name: "Documents",
                icon: FileText,
                path: "/documents",
              },
            ],
          },
        ]
      : []),

    ...(isAdmin
      ? [
          {
            title: "ADMINISTRATION",
            items: [
              {
                name: "Users",
                icon: Users,
                path: "/users",
              },
              // {
              //   name: "Settings",
              //   icon: Settings,
              //   path: "/settings",
              // },
              {
                name: "Audit Logs",
                icon: ClipboardList,
                path: "/audits",
              },
              {
                name: "Authorization",
                icon: ShieldCheck,
                path: "/authorization",
              },
            ],
          },
        ]
      : []),
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        data-testid="menu-button"
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#082D7A] text-white p-2 rounded-lg"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          data-testid="sidebar-overlay"
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => {
            // console.log("Overlay clicked");
            setOpen(false);
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          top-0 left-0 z-50
          h-screen
          w-[240px]
          2xl:w-[280px]
          
          bg-gradient-to-b from-[#082D7A] to-[#041D57]
          text-white
          flex flex-col
          transform transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-2">
          <img
            src={logo}
            alt="Logo"
            className="mt-[10px] ml-[30px] w-[120px] object-contain scale-150 2xl:w-[140px] 2xl:scale-150"
          />

          <button
            data-testid="close-sidebar"
            onClick={() => {
              // console.log("X clicked");
              setOpen(false);
            }}
            className="lg:hidden z-50"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto px-4 sidebar-scroll mt-2">
          {menuGroups.map((group) => (
            <div key={group.title} className="mb-6">
              <p className="text-xs text-blue-200 font-semibold tracking-wider mb-3 px-2 2xl:text-base 2xl:font-medium 2xl:tracking-wide">
                {group.title}
              </p>

              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all 2xl:text-base 2xl:font-medium 2xl:tracking-wide ${
                        isActive
                          ? "bg-[#2563EB] shadow-lg"
                          : "hover:bg-[#143A8A]"
                      }`
                    }
                  >
                    <Icon size={20} className="2xl:w-6 2xl:h-6" />
                    <span className="2xl:text-lg">{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="p-4">
          <div className="border border-blue-500 rounded-2xl p-4 flex items-center gap-3 bg-[#103680]">
            <Headphones size={22} />
            <span className="font-medium">Help & Support</span>
          </div>
        </div>
      </aside>
    </>
  );
}
