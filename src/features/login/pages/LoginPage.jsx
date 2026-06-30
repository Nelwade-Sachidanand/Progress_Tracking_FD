import AuthHero from "../components/AuthHero";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div
      className="
        min-h-screen
        bg-[#F4F6FB]

        flex
        flex-col

        lg:grid
        lg:grid-cols-[58%_42%]

        xl:grid-cols-[60%_40%]

        2xl:grid-cols-[58%_42%]
      "
    >
      {/* Left Side */}

      <div
        className="
          hidden
          lg:block
          lg:min-h-screen
        "
      >
        <AuthHero />
      </div>

      {/* Right Side */}

      <div
        className="
          flex
          items-center
          justify-center

          min-h-screen

          px-5
          sm:px-8
          lg:px-8
          xl:px-10
          2xl:px-12
        "
      >
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
