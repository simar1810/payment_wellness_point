import React from "react";
import Image from "next/image";

function Activeprogram({ data }) {
  return (
    <div className=" w-full h-[320px] overflow-y-scroll scrollbar-hide active-programs">
      <div className=" px-2 ">
        <div className=" flex gap-2">
          <div className=" h-[20px] w-[3px] bg-[#036231]"></div>
          <p className=" font-semibold text-[14px] ">Active Programs</p>
        </div>
      </div>
      {data?.activePrograms?.length > 0 ? (
        data?.activePrograms?.map((program, index) => (
          <div key={index} className=" flex gap-2 p-2 items-center">
            <div className=" h-[50px] w-[50px] relative">
              <Image
                src={program.image}
                layout="fill"
                objectFit="cover"
                className=" rounded-md"
              />
            </div>
            <div>
              <p className=" font-semibold text-[14px] ">{program.name}</p>
              <p className=" text-[12px] text-gray-500">
                {program.description}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className=" flex items-center justify-center h-full">
          <p className=" text-gray-500">No Active Programs</p>
        </div>
      )}
    </div>
  );
}
export default Activeprogram;
