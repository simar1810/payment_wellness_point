import React from "react";
import Image from "next/image";
import { EyeIcon, Menuicon } from "@/components/svgs";
import Link from "next/link";
function Person({ data, text = "" }) {
  return (
    <div className=" w-full flex flex-col  gap-2 ">
      <div className=" h-[.9px] w-full bg-[#ECECEC]"></div>
      <div className=" w-full flex justify-between items-center">
        <div className=" flex gap-3 items-center w-[150px]">
          <div className=" h-[50px] w-[50px] rounded-md  relative">
            <Image
              src={
                !data?.profilePhoto || data.profilePhoto.length === 0
                  ? "/default-user-dp.svg"
                  : data.profilePhoto
              }
              alt=""
              height={0}
              width={0}
              className=" h-full w-full rounded-md"
              unoptimized
            />
            <div
              className={` h-[15px] w-[15px] rounded-full  border-[2px] -bottom-1 -right-1 border-solid border-white absolute z-20 ${data?.isActive ? "bg-[#83C529]" : "bg-[#F46870]"
                } `}
            ></div>
          </div>
          <p className=" font-semibold">{data?.name ?? "N/A"}</p>
        </div>
        {text === "Assign" ? (
          <button className=" font-medium bg-[#036231] text-white rounded-md px-3 py-[3px] ml-[50px] min-w-[110px]">
            Assign
          </button>
        ) : data?.isActive ? (
          <button className=" font-medium bg-[#83C529] text-white rounded-md px-3 py-[3px] ml-[50px] min-w-[110px]">
            Active
          </button>
        ) : (
          <button className=" font-medium border-solid border-[2px] text-[#83C529] border-[#83C529] rounded-md px-3 py-[2px] ml-[50px] min-w-[110px]">
            Non Active
          </button>
        )}

        <div>
          <Link
            href={`/app-clients/${data?._id ?? ""}`}
          // target="_blank"
          >
            <EyeIcon h={20} w={25} c="#000" />
          </Link>
          {/* <Menuicon h={15} w={15} /> */}
        </div>
      </div>
    </div>
  );
}

export default Person;
