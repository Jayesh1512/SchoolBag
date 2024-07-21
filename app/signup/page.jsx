"use client";
import { useState } from "react";
import One from "./One";
import Link from "next/link";

const Page = () => {
  const [pageNo, setPageNo] = useState(1);

  const nextpage = () => {
    setPageNo(pageNo + 1);
  };

  return (
    <div className="overflow-hidden bg-background ">
      <div className="lg:w-1/5 md:w-1/2 mx-auto text-white ">
        <div className="space-y-4 py-5 px-5">
          <p className="text-3xl">Sign up</p>
          <div className="grid w-full grid-cols-2 gap-2">
            <div
              className={`w-full rounded-full ${
                pageNo >= 1 ? "bg-yellow" : "bg-[#393939]"
              } h-1`}
            ></div>
            <div
              className={`w-full rounded-full ${
                pageNo >= 2 ? "bg-yellow" : "bg-[#393939]"
              } h-1`}
            ></div>
            
          </div>
          <div>{pageNo == 1 && <One />}</div>
        </div>
        <div className="text-center px-5 py-5 lg:w-1/5 md:w-1/2 mx-auto flex flex-col items-center gap-4 text-xl w-full absolute bg-background bottom-0 overflow-hidden">
          <button
            className="w-full text-black bg-yellow rounded-md font-medium py-1"
            onClick={nextpage}
          >
            Next &rarr;
          </button>
          <Link href="/login">
            <button className="w-full underline text-sm">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
