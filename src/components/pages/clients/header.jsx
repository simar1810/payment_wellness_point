import React from "react";
import { Searchicon } from "@/components/svgs";

function Header({ data, setdata, setIsAddClientModalOpen }) {
  return (
    <div className=" w-full flex justify-between items-center">
      <div>
        <div className=" flex gap-2">
          <div className=" h-[20px] w-[3px] bg-[#036231]"></div>
          <p className=" font-semibold text-sm">All Clients</p>
        </div>
        <p className=" text-[14px] font-sm text-[#5d5d5d] font-medium">
          {data.length} Members
        </p>
      </div>
      <div className=" flex gap-5">
        <div className=" h-[35px] w-[250px] rounded-full border-[1.5px] border-solid border-[#CCD2CE] outline-none overflow-hidden flex items-center">
          <div className=" h-full w-[35px] flex items-center justify-center">
            <Searchicon h={15} w={15} />
          </div>
          <input
            type="text"
            className="w-[calc(100%-40px)] h-full outline-none border-none text-[#696969]"
            placeholder="Search"
          />
        </div>
        <button
          onClick={() => setIsAddClientModalOpen(true)}
          className=" h-[35px] px-4 bg-[#036231] rounded-md text-white font-medium flex items-center gap-1 "
        >
          <span className=" text-[25px]">+</span> Add Client
        </button>
      </div>
    </div>
  );
}

export default Header;
