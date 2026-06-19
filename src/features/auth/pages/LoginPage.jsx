import AuthHero from "../components/AuthHero";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div
      className="
        min-h-screen
        bg-[#f4f6fb]
        flex
        flex-col
        lg:grid
        lg:grid-cols-[60%_40%]
        xl:grid-cols-[62%_38%]
      "
    >
      <div className="h-[35vh] lg:h-screen">
        <AuthHero />
      </div>

      <div
        className="
          flex
          items-center
          justify-center
          p-5
          sm:p-8
          lg:p-10
        "
      >
        <div className="w-full max-w-[600px]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
