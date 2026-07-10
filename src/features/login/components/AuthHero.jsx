import { BarChart3, Lock, Shield, Users } from "lucide-react";

import bgImage from "../../../assets/images/login-bg.jpg";
import logo from "../../../assets/images/suite1.png";

const AuthHero = () => {
  return (
    <div
      className="
        hidden
        lg:flex
        flex-col
        justify-start
        h-screen
        px-8
        xl:px-12
        2xl:px-16

        pt-6
        xl:pt-1
        2xl:pt-3

        pb-6

        text-white
        relative
        overflow-hidden
      "
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(0,18,70,.68),
            rgba(0,18,70,.68)
          ),
          url(${bgImage})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        className="sm:w-[230px] 2xl:w-[260px] object-contain ml-[-15px]"
      />

      {/* PORTAL TEXT */}
      <p
        className="
          mt-10
          xl:mt-[5px]
          2xl:mt-[15px]

          text-[#1da1ff]
          font-bold
          tracking-wide

          text-sm
          xl:text-base
          2xl:text-xl
        "
      >
        IMPLEMENTATION GOVERNANCE PORTAL
      </p>

      {/* HEADING */}
      <h1
        className="
          mt-3
          xl:mt-3
          2xl:mt-4

          font-bold
          leading-[1.12]

          text-[32px]
          xl:text-[42px]
          2xl:text-[50px]

          max-w-[760px]
        "
      >
        End-To-End Visibility.
        <br />
        Stronger Governance.
        <br />
        <span className="text-[#1da1ff]">Successful Go-Live.</span>
      </h1>

      {/* BLUE LINE */}
      <div
        className="
          w-12
          xl:w-16
          2xl:w-20

          h-1
          bg-[#1da1ff]

          mt-4
        "
      />

      {/* DESCRIPTION */}
      {/* <p
        className="
          mt-3
          xl:mt-4

          max-w-[520px]
          xl:max-w-[620px]

          text-[15px]
          xl:text-[16px]
          2xl:text-[20px]

          leading-relaxed
          text-gray-200
        "
      >
        A centralized platform to manage and monitor banking software
        implementation projects with complete transparency and control.
      </p> */}

      {/* FEATURES */}
      <div
        className="
        mt-10

        rounded-2xl
        border
        border-white/5

        bg-white/[0.02]
        backdrop-blur-xl

        px-1
        py-1

        grid
        grid-cols-1
        sm:grid-cols-3

        overflow-hidden

        shadow-[0_10px_35px_rgba(0,0,0,0.25)]
      "
      >
        {/* FEATURE 1 */}
        <div
          className="
          relative
          flex
          flex-col
          items-center
          justify-center
          text-center

          px-6
          py-6

          border-b
          sm:border-b-0
        "
        >
          {/* Vertical Divider */}
          <div
            className="
            hidden
            sm:block
            absolute
            right-0
            top-6
            bottom-6
            w-px
            bg-white/20
          "
          />

          <Shield
            size={34}
            className="text-[#4DB5FF]"
            strokeWidth={2}
          />

          <h3
            className="
            mt-2
            text-lg
            xl:text-lg
            2xl:text-xl
            font-semibold
            text-white
          "
          >
            Govern With Confidence
          </h3>
        </div>

        {/* FEATURE 2 */}
        <div
          className="
          relative
          flex
          flex-col
          items-center
          justify-center
          text-center

          px-6
          py-6

          border-b
          sm:border-b-0
        "
        >
          {/* Vertical Divider */}
          <div
            className="
            hidden
            sm:block
            absolute
            right-0
            top-6
            bottom-6
            w-px
            bg-white/20
          "
          />

          <Users
            size={34}
            className="text-[#4DB5FF]"
            strokeWidth={2}
          />

          <h3
            className="
            mt-2
            text-lg
            xl:text-lg
            2xl:text-xl
            font-semibold
            text-white
          "
          >
            Collaborate Seamlessly
          </h3>
        </div>

        {/* FEATURE 3 */}
        <div
          className="
          flex
          flex-col
          items-center
          justify-center
          text-center

          px-6
          py-6
        "
        >
          <BarChart3
            size={34}
            className="text-[#4DB5FF]"
            strokeWidth={2}
          />

          <h3
            className="
            mt-2
            text-lg
            xl:text-lg
            2xl:text-xl
            font-semibold
            text-white
          "
          >
            Deliver With Excellence
          </h3>
        </div>
      </div>

      {/* SECURITY CARD */}
      <div className="mt-6 xl:mt-10">
        <div
          className="
          xl:max-w-[500px]
          2xl:max-w-[550px]

          rounded-2xl

          border
          border-white/10

          bg-white/[0.03]
          backdrop-blur-xl

          shadow-[0_8px_30px_rgba(0,0,0,0.25)]

          px-5
          py-4

          flex
          items-center
          gap-4

        "
        >
          {/* Icon */}
          <div
            className="
        flex
        h-11
        w-11
        xl:h-12
        xl:w-12
        2xl:h-14
        2xl:w-14
        shrink-0
        items-center
        justify-center

        rounded-full

        bg-[#1E5EFF]/20
        border
        border-[#4DB5FF]/30
      "
          >
            <Lock
              size={20}
              className="text-[#4DB5FF]"
            />
          </div>

          {/* Text */}
          <div>
            <h3
              className="
          text-base
          xl:text-xl
          2xl:text-2xl
          font-semibold
          text-white
        "
            >
              Secure. Reliable. Compliant.
            </h3>

            <p
              className="
          mt-1
          text-xs
          xl:text-sm
          2xl:text-base
          text-gray-300
          leading-6
        "
            >
              Your Data Is Protected With Enterprise-Grade Security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHero;
