import Image from "next/image";
import LoginForm from "./login-form";

const LoginPage = () => {
  return (
    <div className="absolute z-50 bg-white left-0 top-0 flex h-screen w-screen">
      <div className="h-screen w-[60%] bg-[#FFDE59] hidden flex-col justify-center items-center md:flex">
        <div className="absolute left-0 top-0 mt-8 ml-8 font-semibold text-2xl">
          NITGoa
        </div>
        <div className="relative -ml-2 -mt-20">
          <Image alt="login" src="/login.png" height={300} width={300} />
        </div>
        <div className="font-bold text-2xl mt-4">
          Internal Management System
        </div>
        <div className="font-normal text-sm mt-1">
          Developed by NITRO, NITGoa
        </div>
      </div>

      <div className="h-screen w-full flex flex-col justify-center items-center md:w-[40%]">
        <LoginForm />
      </div>

      <div className="fixed w-screen bottom-0 py-2 border-t text-center bg-white z-10 text-sm">
        This internal management tool is exclusively developed by and for
        NITGoa. Unauthorised access or sharing with any third party is strictly
        prohibited.
      </div>
    </div>
  );
};

export default LoginPage;
