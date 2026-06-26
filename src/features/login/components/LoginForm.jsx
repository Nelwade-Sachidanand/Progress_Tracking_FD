import {
  AlertTriangle,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProjects } from "../../../context/ProjectContext";
import { useAuth } from "../../login/hooks/useAuth";

const LoginForm = () => {
  const { fetchProjects } = useProjects();
  const location = useLocation();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

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

  const [showSessionModal, setShowSessionModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const { login, loading } = useAuth();

  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(username, password);

      if (response?.statusType === "S") {
        const user = response.details.user;
        // console.log(response.details.user);

        const projects = await fetchProjects(user.id);
        // console.log("In Login" + projects);

        if (user.role === "USER") {
          if (projects.length > 0) {
            sessionStorage.setItem("selectedProjectId", projects[0].id);
            navigate("/project-details", { replace: true });
          }
        } else navigate("/dashboard", { replace: true });
        setUsername("");
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
        max-w-[460px]
        xl:max-w-[520px] px-5
        2xl:max-w-[560px]
      "
    >
      {/* Card */}
      <div
        className="
          bg-white

          rounded-[28px]
          xl:rounded-[32px]

          shadow-[0_12px_40px_rgba(15,23,42,0.08)]

          px-8
          xl:px-10
          2xl:px-10

          py-10
          xl:py-12
          2xl:py-14
        "
      >
        {/* Heading */}
        <h1
          className="
            text-center

            font-bold
            text-[#081D5C]

            text-[42px]
            xl:text-[42px]
            2xl:text-[54px]

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

              mb-2

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

                text-gray-400

                w-5
                h-5
              "
            />

            <input
              data-testid="username-input"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full

                h-12
                xl:h-11

                rounded-xl

                border
                border-[#D0D5DD]

                bg-white

                pl-12
                pr-4

                text-[15px]
                xl:text-[16px]

                outline-none

                focus:border-blue-500
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
              mb-2

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

                text-gray-400

                w-5
                h-5
              "
            />

            <input
              data-testid="password-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full

                h-12
                xl:h-11

                rounded-xl

                border
                border-[#D0D5DD]

                bg-white

                pl-12
                pr-12

                text-[15px]
                xl:text-[16px]

                outline-none

                focus:border-blue-500
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
              "
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Remember */}
          <div
            className="
              flex
              justify-between
              items-center

              mt-5
            "
          >
            <label
              className="
                flex
                items-center
                gap-2

                text-[#344054]

                text-[14px]
                xl:text-[15px]
              "
            >
              <input type="checkbox" className="w-3 h-3" />
              Remember me
            </label>

            {/* <button
              type="button"
              className="
                text-[#2563EB]

                font-semibold

                text-[14px]
                xl:text-[15px]

                hover:underline
              "
            >
              Forgot Password?
            </button> */}
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="
    text-[#2563EB]
    font-semibold
    text-[14px]
    xl:text-[15px]
    hover:underline
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

              h-14
              xl:h-13

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
              transition

              cursor-pointer
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <p
        className="
          text-center
          text-[#667085]

          mt-8

          text-[14px]
          xl:text-[15px]
          2xl:text-[16px]
        "
      >
        © 2026 Novillex Technologies. All rights reserved.
      </p>

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

              w-14 h-14
              xl:w-16 xl:h-16
              2xl:w-20 2xl:h-20

              rounded-full
              bg-red-100
             "
            >
              <AlertTriangle
                className="
                text-red-600

                w-7 h-7
                xl:w-8 xl:h-8
                2xl:w-10 2xl:h-10
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
              "
            >
              {message}
            </p>

            <button
              onClick={() => setShowSessionModal(false)}
              className="
                mt-6

                w-[60px]
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
      {showForgotModal && (
        <div
          className="
    fixed
    inset-0
    bg-black/50
    flex
    items-center
    justify-center
    z-[9999]
    "
        >
          <div
            className="
      bg-white
      rounded-2xl
      p-6
      w-full
      max-w-md
      shadow-xl
      "
          >
            <h2 className="text-xl font-bold text-[#081D5C] mb-3">
              Forgot Password
            </h2>

            <p className="text-slate-600 text-sm leading-6">
              Please contact your administrator to reset your password.
            </p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowForgotModal(false)}
                className="
          px-5
          py-2
          bg-[#2563EB]
          text-white
          rounded-lg
          cursor-pointer
          "
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
