import React from "react";

const page = () => {
  return (
    <div className="">
      <div className="min-h-screen lg:w-1/5 md:w-1/2 mx-auto text-white">
        <img src="/img/login/main/bag.png" className="w-11/12 mx-auto" alt="" />
        <p className="text-center text-brand-primary-200 my-2 text-xl font-medium">
          All Your Learning, One Place
        </p>
        <div className="space-y-5 mt-5 px-7">
          <div className="flex justify-center gap-2 font-medium text-lg p-2 border border-white rounded-lg">
            <img src="/img/login/main/google.svg" className="h-6" alt="" />
            <p>Login using Google</p>
          </div>

          <p className="font-medium text-base-100 text-center">OR</p>

          <div className="flex justify-center gap-2 font-medium text-lg p-2 border border-white rounded-lg">
            <p>Login using Email</p>
          </div>
          <div className="flex justify-center items-center bg-brand-primary-200 text-base-500 gap-2 font-medium text-lg p-2 rounded-lg">
            <img src="/img/login/main/gmail.svg" className="h-5" alt="" />
            <p>Signup using Mail</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
