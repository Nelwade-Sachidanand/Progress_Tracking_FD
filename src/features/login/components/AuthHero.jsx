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
      {/* LOGO */}
      {/* <div className="relative flex items-center">
        <img
          src={logo}
          alt="Novillex"
          className="
          object-contain
          origin-left

          w-[180px]
          xl:w-[240px]
          2xl:w-[280px]

          scale-100
          xl:scale-110
          2xl:scale-120

          ml-0
"
        />
      </div> */}

      <img
        src={logo}
        alt="Logo"
        className="w-[200px] object-contain ml-[-15px]"
      />

      {/* PORTAL TEXT */}
      <p
        className="
          mt-4
          xl:mt-[-30px]
          2xl:mt-[-20px]

          text-[#1da1ff]
          font-bold
          tracking-wide

          text-sm
          xl:text-base
          2xl:text-[25px]
        "
      >
        IMPLEMENTATION GOVERNANCE PORTAL
      </p>

      {/* HEADING */}
      <h1
        className="
          mt-3
          xl:mt-1
          2xl:mt-4

          font-bold
          leading-[1.12]

          text-[32px]
          xl:text-[42px]
          2xl:text-[58px]

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
          mt-6
          xl:mt-8

          grid
          grid-cols-3

          gap-3
          xl:gap-5
          2xl:gap-6
        "
      >
        {/* FEATURE 1 */}
        <div className="pr-2 xl:pr-4">
          <Shield size={32} className="text-[#1da1ff]" />

          <h3
            className="
              mt-3
              font-semibold

              text-[15px]
              xl:text-[18px]
              2xl:text-[20px]
              leading-6
            "
          >
            Govern With Confidence
          </h3>

          {/* <p
            className="
              mt-2

              text-[12px]
              xl:text-[14px]
              2xl:text-[16px]
              leading-6
              text-gray-300
            "
          >
            Monitor risks, issues and milestones in real time.
          </p> */}
        </div>

        {/* FEATURE 2 */}
        <div
          className="
            px-2
            xl:px-4

            border-l
            border-r
            border-white/10
          "
        >
          <Users size={32} className="text-[#1da1ff]" />

          <h3
            className="
              mt-3
              font-semibold

              text-[15px]
              xl:text-[18px]
              2xl:text-[20px]
              leading-6
            "
          >
            Collaborate Seamlessly
          </h3>

          {/* <p
            className="
              mt-2

              text-[12px]
              xl:text-[14px]
              2xl:text-[16px]
              leading-6
              text-gray-300
            "
          >
            Align teams, track deliverables and drive accountability.
          </p> */}
        </div>

        {/* FEATURE 3 */}
        <div className="pl-2 xl:pl-4">
          <BarChart3 size={32} className="text-[#1da1ff]" />

          <h3
            className="
              mt-3
              font-semibold

              text-[15px]
              xl:text-[18px]
              2xl:text-[20px]
              leading-6
            "
          >
            Deliver With Excellence
          </h3>

          {/* <p
            className="
              mt-2

              text-[12px]
              xl:text-[14px]
              2xl:text-[16px]
              leading-6
              text-gray-300
            "
          >
            Ensure quality delivery and successful go-live.
          </p> */}
        </div>
      </div>

      {/* SECURITY CARD */}
      <div className="mt-6 xl:mt-14">
        <div
          className="
            max-w-[500px]
            xl:max-w-[500px]

            bg-white/5
            backdrop-blur-md

            border
            border-white/10

            rounded-2xl

            px-4
            py-3

            xl:px-6
            xl:py-3

            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              w-10
              h-10

              xl:w-12
              xl:h-12

              rounded-full
              bg-blue-600

              flex
              items-center
              justify-center

              shrink-0
            "
          >
            <Lock size={20} />
          </div>

          <div>
            <h3
              className="
                font-bold

                text-base
                xl:text-xl
                2xl:text-2xl
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
