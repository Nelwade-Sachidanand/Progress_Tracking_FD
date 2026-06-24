import { ArrowLeft, Save, UserPlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useProjects } from "../../../context/ProjectContext";
import { useUsers } from "../hooks/useUsers";

const UserForm = ({ mode = "add", userData = null }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { createUser, updateUser } = useUsers();

  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [status, setStatus] = useState("ACTIVE");
  const [selectedProjects, setSelectedProjects] = useState([]);

  const { projects } = useProjects();

  const availableProjects = projects;

  useEffect(() => {
    if (mode === "edit" && userData) {
      setId(userData.id || "");
      setFullName(userData.fullname || "");
      setUsername(userData.username || "");
      setRole(userData.role || "USER");

      setStatus(userData.active ? "ACTIVE" : "INACTIVE");

      const assignedProjects = availableProjects.filter((project) =>
        userData.projectNames?.includes(project.projectName),
      );

      setSelectedProjects(assignedProjects);
    }
  }, [mode, userData]);

  const addProject = (project) => {
    const exists = selectedProjects.some((p) => p.id === project.id);

    if (!exists) {
      setSelectedProjects((prev) => [...prev, project]);
    }
  };

  const removeProject = (projectId) => {
    setSelectedProjects((prev) =>
      prev.filter((project) => project.id !== projectId),
    );
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

    if (!/^[a-zA-Z0-9._]+$/.test(username.trim())) {
      toast.error(
        "Username can contain only letters, numbers, dot (.) and underscore (_)",
      );
      return false;
    }

    // Password validation only for Add User
    if (mode === "add") {
      if (!password.trim()) {
        toast.error("Password is required");
        return false;
      }

      if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return false;
      }

      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password)) {
        toast.error(
          "Password must contain at least one uppercase letter, one lowercase letter and one number",
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
        fullname: fullName,
        username,
        password,
        role,
        status: status === "ACTIVE" ? true : false,
        projectIds: selectedProjects.map((project) => project.id),
      };

      // console.log(payload);

      const response =
        mode === "add" ? await createUser(payload) : await updateUser(payload);

      if (response?.statusType === "S") {
        navigate("/users");
      }
    } catch (error) {
      console.error(error);
      // alert(error?.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-slate-200
      shadow-sm
      overflow-hidden
      "
    >
      {/* Header */}

      <div
        className="
        px-5
        md:px-8
        xl:px-10
        py-5
        xl:py-4
        border-b
        border-slate-200
        "
      >
        <div
          className="
          flex
          items-center
          justify-between
          "
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/users")}
              className="
              h-10
              w-10
              rounded-xl
              border
              border-slate-200
              flex
              items-center
              justify-center
              hover:bg-slate-50
              transition
              cursor-pointer
              "
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1
                className="
                text-[24px]
                md:text-[24px]
                xl:text-[24px]
                font-bold
                text-[#142850]
                2xl:text-[28px]
                2xl:font-bold
                2xl:tracking-wide
                "
              >
                {mode === "add" ? "Add User" : "Edit User"}
              </h1>

              <p
                className="
                text-slate-500
                text-sm
                xl:text-base
                2xl:text-[16px]
                2xl:font-medium
                2xl:tracking-wide
                "
              >
                {mode === "add"
                  ? "Create and assign a new user"
                  : "Update user information"}
              </p>
            </div>
          </div>

          <UserPlus size={30} className="text-blue-600 mt-[-20px]" />
        </div>
      </div>

      {/* Form */}

      <div
        className="
        p-5
        md:p-8
        xl:p-5 mt-[-10px]
        "
      >
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
          xl:gap-7
          "
        >
          {/* Full Name */}

          <div>
            <label
              className="
              block
              px-1
              mb-2
              font-semibold
              text-slate-700
              2xl:text-[17px]
              2xl:font-medium
              2xl:tracking-wide
              "
            >
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="
              w-full
              h-10
              xl:h-10
              px-4
              rounded-xl
              border
              border-slate-300
              focus:border-blue-500
              outline-none
              2xl:text-[17px]
              2xl:font-medium
              2xl:tracking-wide
              "
            />
          </div>

          {/* Username */}

          <div>
            <label
              className="
              block
              px-1
              mb-2
              font-semibold
              text-slate-700
              2xl:text-[17px]
              2xl:font-medium
              2xl:tracking-wide
              "
            >
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
              w-full
              h-10
              xl:h-10
              px-4
              rounded-xl
              border
              border-slate-300
              focus:border-blue-500
              outline-none
              2xl:text-[17px]
              2xl:font-medium
              2xl:tracking-wide
              "
            />
          </div>

          {/* Password */}

          <div>
            <label
              className="
              block
              px-1
              mb-2
              font-semibold
              text-slate-700
              2xl:text-[17px]
              2xl:font-medium
              2xl:tracking-wide
              "
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
              w-full
              h-10
              xl:h-10
              px-4
              rounded-xl
              border
              border-slate-300
              focus:border-blue-500
              outline-none
              2xl:text-[17px]
              2xl:font-medium
              2xl:tracking-wide
              "
            />
          </div>

          {/* Role */}

          <div>
            <label
              className="
              block
              px-1
              mb-2
              font-semibold
              text-slate-700
              2xl:text-[17px]
              2xl:font-medium
              2xl:tracking-wide
              "
            >
              Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="
              w-full
              h-10
              xl:h-10
              px-4
              rounded-xl
              border
              border-slate-300
              cursor-pointer
              text-sm
              2xl:text-[17px]
              2xl:font-medium
              2xl:tracking-wide
              "
            >
              <option>ADMIN</option>
              <option>MANAGEMENT USER</option>
              <option>IMPLEMENTATION USER</option>
              <option>USER</option>
            </select>
          </div>

          {/* Status */}

          <div>
            <label
              className="
              block
              mb-2
              font-semibold
              text-slate-700
              2xl:text-[17px]
              2xl:font-medium
              2xl:tracking-wide
              "
            >
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="
              w-full
              h-10
              xl:h-10
              px-4
              rounded-xl
              border
              border-slate-300
              text-sm
              cursor-pointer
              2xl:text-[17px]
              2xl:font-medium
              2xl:tracking-wide
              "
            >
              <option>ACTIVE</option>
              <option>INACTIVE</option>
            </select>
          </div>
        </div>

        {/* Assigned Projects */}

        <div className="mt-8 xl:mt-8">
          <h3
            className="
            text-lg
            xl:text-lg
            font-bold
            text-[#142850]
            mb-4
            2xl:text-[18px]
            2xl:font-semibold
            2xl:tracking-wide
            "
          >
            Assigned Projects
          </h3>

          <div
            className="
            min-h-[40px]
            rounded-xl
            border
            border-slate-300
            p-1
            flex
            flex-wrap
            gap-3
            mt-[-7px]
            "
          >
            {selectedProjects.map((project) => (
              <div
                key={project.id}
                className="
                px-4
                py-2
                rounded-lg
                bg-blue-100
                text-blue-700
                font-medium
                flex
                items-center
                gap-2
                2xl:text-[17px]
                2xl:font-medium
                2xl:tracking-wide
                "
              >
                {project.projectName}

                <button
                  className="cursor-pointer"
                  onClick={() => removeProject(project.id)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Available Projects */}

        <div className="mt-5">
          <h3
            className="
            text-lg
            xl:text-lg
            font-bold
            text-[#142850]
            mb-4
            2xl:text-[18px]
            2xl:font-semibold
            2xl:tracking-wide
            "
          >
            Available Projects
          </h3>

          <div className="flex flex-wrap gap-3 mt-[-7px]">
            {availableProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => addProject(project)}
                className="
                text-sm
                px-4
                py-2
                rounded-xl
                border
                border-slate-300
                hover:bg-blue-50
                hover:border-blue-500
                transition
                cursor-pointer
                2xl:px-5
                2xl:py-3
                2xl:text-[17px]
                "
              >
                {project.projectName}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}

        <div
          className="
          mt-6
          pt-6
          border-t
          flex
          flex-col
          sm:flex-row
          justify-end
          gap-4
          "
        >
          <button
            onClick={() => navigate("/users")}
            className="
            h-12
            px-6
            rounded-xl
            bg-slate-200
            font-semibold
            cursor-pointer
            2xl:px-8
            2xl:text-[17px]
            2xl:font-medium
            2xl:tracking-wide
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmitUser}
            className="
            h-12
            px-8
            rounded-xl
            bg-gradient-to-r
            from-[#2563EB]
            to-[#3B82F6]
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            cursor-pointer
            2xl:px-8
            2xl:h-12
            2xl:text-[17px]
            2xl:font-medium
            2xl:tracking-wide
            "
          >
            {mode === "edit" ? (
              <UserPlus size={20} className="text-white-600 mt-[-5px]" />
            ) : (
              <Save size={20} className="text-white-600 mt-[-5px]" />
            )}
            {mode === "add" ? "Save User" : "Update User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
