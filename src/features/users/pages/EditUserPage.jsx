import { useLocation } from "react-router-dom";
import UserForm from "../components/UserForm";

const EditUserPage = () => {
    const location = useLocation();

    const userData = location.state?.user;

    // console.log(userData);

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
                <UserForm
                    mode="edit"
                    userData={userData}
                />
            </div>
        </div>
    );
};

export default EditUserPage;