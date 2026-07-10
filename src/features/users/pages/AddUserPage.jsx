import UserForm from "../components/UserForm.jsx";

const AddUserPage = () => {
  return (
    <div
      className="
      w-full
      min-h-[calc(100vh-100px)]
      bg-[#F8FAFC]
      p-4
      md:p-6
      xl:p-6
      2xl:p-10
      "
    >
      <div
        className="
        w-full
        mx-auto
        "
      >
        <UserForm />
      </div>
    </div>
  );
};

export default AddUserPage;
