import React from "react";
import { Boxheader } from ".";
export default function Topperfomers({ data }) {
  const dummydata = [
    { img: "", name: "John doe", email: "jhondoe@gmail.com" },
    { img: "", name: "Robert white", email: "robertwhite@gmail.com" },
    { img: "", name: "Sam hitman", email: "samhitman@gmail.com" },
  ];
  console.log(data?.topPerformers);
  return (
    <div className=" w-full min-h-[320px] top-performers">
      <div className=" p-2">
        <Boxheader title={"Top Perfomers "} data={data?.topPerfomers} />
      </div>
      {data?.topPerformers?.length > 0 ? (
        data?.topPerformers?.map((perfomer, index) => (
          <Perfomers key={index} data={perfomer} />
        ))
      ) : (
        <div className=" h-[280px] flex items-center justify-center">
          <p className=" text-gray-500">No Perfomers</p>
        </div>
      )}
    </div>
  );
}
function Perfomers({ data }) {
  return (
    <div className=" w-full flex flex-col gap-2 items-center ">
      <div className=" h-[.8px] w-full bg-[#ECECEC] "></div>
      <div className=" w-[95%] flex gap-3 items-center px-1">
        <div className=" h-[45px] w-[45px] bg-green-500 rounded-md"></div>
        <div>
          <p className=" text-sm text-black font-semibold">{data.name}</p>
          <p className=" text-[#82867E] text-sm">{data.email}</p>
        </div>
      </div>
    </div>
  );
}
