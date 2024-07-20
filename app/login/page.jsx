import { FcGoogle } from "react-icons/fc";
import { LuMail } from "react-icons/lu";

const page = () => {
  return (
    <div className="min-h-screen text-center lg:w-1/5 mx-auto max-sm:w-full w-1/2 relative max-sm:-top-10  overflow-hidden">
      <img src="/img/login/main/bag.png" alt="" className="relative" />
      <p className="text-yellow font-medium text-xl py-5">
        All Your Learning, One Place
      </p>
      <div className=" flex justify-center ">
        <div className="flex flex-col items-center w-11/12">
          <button className="text-white flex justify-center w-full items-center gap-4 py-2 border rounded-lg font-medium text-base">
            <FcGoogle />
            <span className="">Login Using Google</span>
          </button>
          <p className="text-[#595959] font-medium py-4 ">OR</p>
          <button className="text-white flex justify-center w-full items-center gap-4 py-2 border rounded-lg font-medium text-base">
            <p className="">Login Using email</p>
          </button>
          <button className="text-black bg-yellow flex justify-center mt-6 w-full items-center gap-4 py-2 border border-black rounded-lg font-medium text-base">
            <LuMail />
            <span className="">Signup Using email</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
