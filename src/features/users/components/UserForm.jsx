import { Eye, EyeOff, Save, UserPlus, X } from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import CustomDropdown from "../../../components/common/CustomDropdown";
import MultiSelectDropdown from "../../../components/common/MultiSelectDropdown";

import { useNavigate } from "react-router-dom";
import { useProjects } from "../../../context/ProjectContext";
import { useUsers } from "../hooks/useUsers";

const UserForm = ({ mode = "add", userData = null }) => {
  const navigate = useNavigate();
  const { createUser, updateUser } = useUsers();

  const { projects } = useProjects();

  const [loading, setLoading] = useState(false);

  const [id, setId] = useState("");

  const [fullName, setFullName] = useState("");

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("USER");

  const [status, setStatus] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const [selectedProjects, setSelectedProjects] = useState([]);

  useEffect(() => {
    if (mode === "edit" && userData) {
      setId(userData.id || "");

      setFullName(userData.fullname || "");

      setUsername(userData.username || "");

      setEmail(userData.email || "");

      setRole(userData.role || "USER");

      setStatus(userData.status);

      const assigned = projects.filter((project) =>
        userData.projectNames?.includes(project.projectName),
      );

      setSelectedProjects(assigned);
    }
  }, [mode, userData, projects]);

  const projectOptions = useMemo(() => {
    return [...projects]
      .sort((a, b) => a.projectName.localeCompare(b.projectName))
      .map((project) => ({
        label: project.projectName,
        value: project.id,
      }));
  }, [projects]);

  const selectedProjectIds = selectedProjects.map((project) => project.id);

  const handleProjectChange = (ids) => {
    const selected = projects.filter((project) => ids.includes(project.id));

    setSelectedProjects(selected);
  };

  const removeProject = (id) => {
    setSelectedProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const validateForm = () => {
    if (!fullName.trim()) {
      toast.error("Full Name is required");
      return false;
    }

    if (fullName.trim().length < 3) {
      toast.error("Full Name must be at least 3 characters");
      return false;
    }

    if (!/^[A-Za-z\s]+$/.test(fullName.trim())) {
      toast.error("Full Name can contain only alphabets and spaces");
      return false;
    }

    if (!username.trim()) {
      toast.error("Username is required");
      return false;
    }

    if (username.trim().length < 4) {
      toast.error("Username must be at least 4 characters");
      return false;
    }

    if (!/^[A-Za-z0-9._]+$/.test(username.trim())) {
      toast.error(
        "Username can contain only letters, numbers, dot (.) and underscore (_)",
      );
      return false;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    if (mode === "add") {
      if (!password.trim()) {
        toast.error("Password is required");
        return false;
      }

      if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return false;
      }

      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(password)
      ) {
        toast.error(
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        );
        return false;
      }
    }

    if (selectedProjects.length === 0) {
      toast.error("Please assign at least one project");
      return false;
    }

    return true;
  };

  const handleSubmitUser = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        userId: id,
        fullname: fullName,
        username,
        email,
        password,
        role,
        status,
        projectIds: selectedProjects.map((project) => project.id),
      };

      const response =
        mode === "add" ? await createUser(payload) : await updateUser(payload);

      if (response?.statusType === "S") {
        onClose?.();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div
        className="
        w-full
        max-w-[850px]
        rounded-2xl
        bg-white
        shadow-2xl
        border
        border-slate-200
        overflow-visible
      "
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
              <UserPlus className="text-blue-600" size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#142850]">
                {mode === "add" ? "Add User" : "Edit User"}
              </h2>

              <p className="text-sm text-slate-500">
                {mode === "add"
                  ? "Create and assign a new user"
                  : "Update user information"}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/users")}
            className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            hover:bg-slate-100
            transition
            cursor-pointer
          "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="p-6 overflow-visible">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Full Name */}

            <div>
              <label className="block mb-1 ml-1 text-sm font-semibold text-slate-600">
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter Full Name"
                className="
                w-full
                h-9
                rounded-lg
                border
                border-slate-300
                px-4
                text-sm
                outline-none
                focus:border-blue-500
              "
              />
            </div>

            {/* Username */}

            <div>
              <label className="block mb-1 ml-1 text-sm font-semibold text-slate-600">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
                className="
                w-full
                h-9
                rounded-lg
                border
                border-slate-300
                px-4
                text-sm
                outline-none
                focus:border-blue-500
              "
              />
            </div>

            {/* Email */}

            <div>
              <label className="block mb-1 ml-1 text-sm font-semibold text-slate-600">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="
                w-full
                h-9
                rounded-lg
                border
                border-slate-300
                px-4
                text-sm
                outline-none
                focus:border-blue-500
              "
              />
            </div>

            {/* Password */}

            {mode === "add" && (
              <div>
                <label className="block mb-1 ml-1 text-sm font-semibold text-slate-600">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="
                    w-full
                    h-9
                    rounded-lg
                    border
                    border-slate-300
                    px-4
                    pr-10
                    text-sm
                    outline-none
                    focus:border-blue-500
                  "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                    cursor-pointer
                  "
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {/* Role */}

            <CustomDropdown
              label="Role"
              placeholder="Select Role"
              value={role}
              onChange={setRole}
              options={[
                {
                  label: "Administrator",
                  value: "ADMIN",
                },
                {
                  label: "Management User",
                  value: "MANAGEMENT USER",
                },
                {
                  label: "Implementation User",
                  value: "IMPLEMENTATION USER",
                },
                {
                  label: "Bank User",
                  value: "USER",
                },
              ]}
            />

            {/* Status */}

            <CustomDropdown
              label="Status"
              placeholder="Select Status"
              value={status ? "ACTIVE" : "INACTIVE"}
              onChange={(value) => setStatus(value === "ACTIVE")}
              options={[
                {
                  label: "Active",
                  value: "ACTIVE",
                },
                {
                  label: "Inactive",
                  value: "INACTIVE",
                },
              ]}
            />
          </div>

          <div
            className="
    mt-5
    grid
    grid-cols-1
    lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]
    gap-5
    items-start
  "
          >
            {/* Left Column */}
            <div className="relative z-50">
              <MultiSelectDropdown
                label="Assign Project"
                placeholder="Select Projects"
                options={projectOptions.map((p) => p.label)}
                selected={selectedProjects.map((p) => p.projectName)}
                onChange={(names) => {
                  const selected = projects.filter((project) =>
                    names.includes(project.projectName),
                  );
                  setSelectedProjects(selected);
                }}
              />
            </div>

            {/* Right Column */}
            <div>
              <label className="block mb-1 ml-1 text-sm font-semibold text-slate-600">
                Selected Projects ({selectedProjects.length})
              </label>

              <div
                className="
        min-h-[150px]
        overflow-y-auto
        rounded-lg
        border
        border-slate-300
        bg-slate-50
        p-3
      "
              >
                {selectedProjects.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-sm text-slate-400">
                    No project selected
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedProjects.map((project) => (
                      <div
                        key={project.id}
                        className="
                flex
                items-center
                gap-2
                rounded-full
                bg-blue-100
                px-3
                py-1.5
                text-sm
                font-medium
                text-blue-700
              "
                      >
                        <span className="truncate max-w-[180px]">
                          {project.projectName}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeProject(project.id)}
                          className="rounded-full p-0.5 hover:bg-blue-200 cursor-pointer"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}

          <div
            className="
            mt-6
            pt-5
            border-t
            border-slate-200
            flex
            justify-end
            gap-3
          "
          >
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="
              h-9
              rounded-xl
              border
              border-slate-300
              bg-white
              px-6
              text-sm
              font-semibold
              text-slate-700
              hover:bg-slate-50
              transition
              cursor-pointer
            "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmitUser}
              disabled={loading}
              className="
              flex
              h-9
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-[#2563EB]
              to-[#3B82F6]
              px-6
              text-sm
              font-semibold
              text-white
              hover:opacity-95
              disabled:cursor-not-allowed
              disabled:opacity-60
              cursor-pointer 
            "
            >
              {mode === "add" ? <Save size={18} /> : <UserPlus size={18} />}

              {loading
                ? "Please wait..."
                : mode === "add"
                  ? "Save User"
                  : "Update User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
