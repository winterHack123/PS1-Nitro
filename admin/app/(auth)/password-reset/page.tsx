import Image from "next/image";
import ResetForm from "./reset-form";

const ResetPasswordPage = () => {
  return (
    <div className="absolute z-50 bg-white left-0 top-0 flex h-screen w-screen">
      <div className="h-screen w-[60%] bg-[#FFDE59] hidden flex-col justify-center items-center md:flex">
        <div className="absolute left-0 top-0 mt-8 ml-8 font-bold text-2xl">
          NITGoa
        </div>
        <div className="relative -ml-2 -mt-20">
          <Image alt="login" src="/login.png" height={300} width={300} />
        </div>
        <div className="font-bold text-2xl mt-4">Admin Portal</div>
        <div className="font-normal text-sm mt-1">Reset your password now!</div>
      </div>

      <div className="h-screen w-full flex flex-col justify-center items-center md:w-[40%]">
        <ResetForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
