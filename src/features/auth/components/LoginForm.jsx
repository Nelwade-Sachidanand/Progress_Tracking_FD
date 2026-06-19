import { Eye, EyeOff, Lock, ShieldCheck, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(username, password);

    if (response?.statusType === "S") {
      navigate("/dashboard");
      setUsername("");
      setPassword("");
      setShowPassword(false);
    } else {
      setPassword("");
      setShowPassword(false);
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

            <button
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
    </div>
  );
};

export default LoginForm;
