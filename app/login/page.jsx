import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { LuMail } from "react-icons/lu";

const page = () => {
  return (
    <div className="bg-base-500 h-screen flex flex-col text-center lg:w-1/5 mx-auto max-sm:w-full w-1/2 relative max-sm:-top-10 overflow-hidden gap-20">
      <div className="flex flex-col justify-center items-center gap-6">
        <img src="/img/login/main/bag.png" alt="" className="relative" />
        <p className="title-1 text-brand-primary-200">
          All Your Learning, One Place
        </p>
      </div>
      <div className=" flex justify-center ">
        <div className="flex flex-col items-center w-11/12">
          <button className="text-white flex justify-center w-full items-center gap-4 py-2 border rounded-lg font-medium text-base">
            <FcGoogle />
            <span className="title-3">Login Using Google</span>
          </button>
          <p className="text-[#595959] font-medium py-4 ">OR</p>
          <button className="text-white flex justify-center w-full items-center gap-4 py-2 border rounded-lg font-medium text-base">
            <p className="title-3">Login Using email</p>
          </button>
          <button className="text-black  bg-brand-primary-200 flex justify-center mt-6 w-full items-center gap-4 py-2 border border-none rounded-lg font-medium text-base">
            <LuMail />
            <Link href='/signup' className="title-3">Signup Using email</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
