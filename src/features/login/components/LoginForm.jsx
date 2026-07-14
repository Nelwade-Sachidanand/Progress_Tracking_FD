import {
  AlertTriangle,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  User,
  CheckSquare,
  Square
} from "lucide-react";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";
import { useProjects } from "../../../context/ProjectContext";
import { useAuth } from "../../login/hooks/useAuth";

const LoginForm = () => {
  const { fetchProjects } = useProjects();

  const location = useLocation();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [showSessionModal, setShowSessionModal] = useState(false);

  const [showForgotModal, setShowForgotModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const { login, loading } = useAuth();

  useEffect(() => {
    if (location.state?.showSessionModal) {
      setShowSessionModal(true);

      setMessage(location.state.message);

      navigate("/", {
        replace: true,
        state: null,
      });
    }
  }, [location, navigate]);

  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberUsername");

    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(username, password);

      if (response?.statusType === "S") {
        const user = response.details.user;

        const projects = await fetchProjects(user.id);

        if (user.role === "USER") {
          if (projects.length > 0) {
            sessionStorage.setItem("selectedProjectId", projects[0].id);

            navigate("/project-details", {
              replace: true,
            });
          }
        } else {
          navigate("/dashboard", {
            replace: true,
          });
        }

        if (rememberMe) {
          localStorage.setItem("rememberUsername", username);
        } else {
          localStorage.removeItem("rememberUsername");
        }

        if (!rememberMe) {
          setUsername("");
        }
        setPassword("");
        setShowPassword(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="
        w-full

        max-w-[400px]
        lg:max-w-[420px]
        xl:max-w-[450px]
        2xl:max-w-[500px]

        mx-auto
      "
    >
      {/* Card */}

      <div
        className="
          bg-white

          rounded-2xl
          xl:rounded-3xl

          shadow-[0_12px_40px_rgba(15,23,42,0.08)]
          border border-[#CDD7E3]

          px-8
          xl:px-10
          2xl:px-12

          py-9
          xl:py-10
          2xl:py-12
        "
      >
        {/* Heading */}

        <h1
          className="
            text-center

            font-bold

            text-[#081D5C]

            text-[38px]
            lg:text-[40px]
            xl:text-[42px]
            2xl:text-[52px]

            leading-none
          "
        >
          Welcome Back
        </h1>

        <h2
          className="
            text-center

            text-[#081D5C]

            font-medium

            mt-3

            text-[16px]
            xl:text-[16px]
            2xl:text-[20px]
          "
        >
          Implementation Governance Portal
        </h2>

        {/* Divider */}

        <div
          className="
            flex
            items-center
            gap-5

            mt-6
          "
        >
          <div className="flex-1 h-px bg-gray-200" />

          <ShieldCheck
            className="
              text-[#2563EB]

              w-5
              h-5

              xl:w-6
              xl:h-6
            "
          />

          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Form */}

        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Username */}

          <label
            className="
              block

              font-semibold
              text-[#101828]

              mb-1

              text-[15px]
              xl:text-[16px]
            "
          >
            Username
          </label>

          <div className="relative">
            <User
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2

                text-gray-500

                w-5
                h-5
              "
            />

            <input
              data-testid="username-input"
              type="text"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full

                h-9
                xl:h-10

                rounded-lg 

                border
                border-[#B8C4D1]

                bg-white

                pl-12
                pr-4

                text-[15px]
                xl:text-[16px]

                outline-none

                transition-all

                focus:border-blue-500
                placeholder:text-slate-500
              "
            />
          </div>

          {/* Password */}

          <label
            className="
              block

              font-semibold
              text-[#101828]

              mt-5
              mb-1

              text-[15px]
              xl:text-[16px]
            "
          >
            Password
          </label>

          <div className="relative">
            <Lock
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2

                text-slate-500

                w-5
                h-5
              "
            />

            <input
              data-testid="password-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full

                h-9
                xl:h-10

                rounded-lg

                border
                border-[#B8C4D1]

                bg-white

                pl-12
                pr-12

                text-[15px]
                xl:text-[16px]

                outline-none

                transition-all

                focus:border-blue-500
                placeholder:text-slate-500
              "
            />

            <button
              data-testid="toggle-password"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2

                text-gray-400

                hover:text-[#2563EB]

                transition

                cursor-pointer
              "
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Remember + Forgot */}

          <div
            className="
              flex
              items-center
              justify-between

              gap-3

              mt-5

              flex-wrap
            "
          >
            <label
              onClick={() => setRememberMe((prev) => !prev)}
              className="
              flex
              items-center
              gap-2
              text-sm
              xl:text-base
              text-slate-600
              cursor-pointer
              select-none
            "
            >
              {rememberMe ? (
                <CheckSquare
                  size={20}
                  className="text-[#2563EB]"
                />
              ) : (
                <Square
                  size={20}
                  className="text-slate-400"
                />
              )}

              Remember Me
            </label>

            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="
                text-[#2563EB]

                font-semibold

                text-[14px]
                xl:text-[15px]

                hover:underline

                transition

                cursor-pointer
              "
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}

          <button
            disabled={loading}
            className="
              w-full

              h-10
              xl:h-11

              mt-8

              rounded-xl

              bg-gradient-to-r
              from-[#2563EB]
              to-[#0D6EFD]

              text-white

              font-semibold

              text-[18px]
              xl:text-[20px]

              shadow-md

              hover:opacity-95
              transition-all

              disabled:opacity-60
              disabled:cursor-not-allowed

              cursor-pointer
            "
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>

      {/* Footer */}

      <p
        className="
          text-center
          text-[#667085]

          mt-6
          xl:mt-8

          text-[14px]
          xl:text-[15px]
          2xl:text-[16px]
        "
      >
        © 2026 Novillex Technologies. All Rights Reserved.
      </p>

      {/* Session Expired Modal */}

      {showSessionModal && (
        <div
          className="
            fixed
            inset-0
            z-[9999]

            flex
            items-center
            justify-center

            bg-black/50
            backdrop-blur-sm

            px-4
          "
        >
          <div
            className="
              bg-white

              rounded-3xl

              shadow-2xl

              w-full
              max-w-[340px]
              sm:max-w-[420px]
              xl:max-w-[500px]
              2xl:max-w-[580px]

              p-6
              xl:p-8
              2xl:p-10

              text-center
            "
          >
            <div
              className="
                mx-auto

                flex
                items-center
                justify-center

                w-14
                h-14

                xl:w-16
                xl:h-16

                2xl:w-20
                2xl:h-20

                rounded-full

                bg-red-100
              "
            >
              <AlertTriangle
                className="
                  text-red-600

                  w-7
                  h-7

                  xl:w-8
                  xl:h-8

                  2xl:w-10
                  2xl:h-10
                "
              />
            </div>

            <h2
              className="
                mt-5

                font-bold

                text-[#081D5C]

                text-xl
                xl:text-2xl
                2xl:text-3xl
              "
            >
              Session Expired
            </h2>

            <p
              className="
                mt-3

                text-slate-600

                text-sm
                xl:text-base
                2xl:text-lg

                leading-7
              "
            >
              {message}
            </p>

            <button
              onClick={() => setShowSessionModal(false)}
              className="
                mt-6

                w-[70px]

                h-11
                xl:h-12
                2xl:h-14

                rounded-xl

                bg-[#2563EB]
                hover:bg-[#1D4ED8]

                text-white

                font-semibold

                text-sm
                xl:text-base
                2xl:text-lg

                transition-all

                cursor-pointer
              "
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}

     <ForgotPasswordModal
  isOpen={showForgotModal}
  onClose={() => setShowForgotModal(false)}
  // onSubmit={async (request) => {
  //   try {
  //     const response = await forgotPassword(request.username);

  //     if (response?.statusType === "S") {
  //       toast.success(
  //         response.message || "Password reset request submitted successfully."
  //       );

  //       setShowForgotModal(false);
  //     } else {
  //       toast.error(
  //         response?.message || "Failed to submit password reset request."
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);

  //     toast.error(
  //       error?.response?.data?.message ||
  //         "Something went wrong. Please try again."
  //     );
  //   }
  // }}
 onSubmit={async (request) => {
  try {
    const response = await forgotPassword(request.username);

    if (response?.statusType === "S") {
      toast.success(response?.message);
      return true;
    }

    toast.error(response?.message);
    return false;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      "Something went wrong"
    );
    return false;
  }
}}
/>
    </div>
  );
};

export default LoginForm;
