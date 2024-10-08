import React from "react";
import { Boxheader } from ".";

export default function Nextfollowups({ data }) {
  const dummydata = [
    { img: "", name: "Symond Write", followups: "6" },
    { img: "", name: "John Doe", followups: "4" },
    { img: "", name: "Robert Johnson", followups: "8" },
  ];
  return (
    <div className=" w-full min-h-[320px] upcoming-followups">
      <div className=" p-2">
        <Boxheader title={"Next Follow-ups"} data={data?.clientFollowUps} />
      </div>
      {data?.clientFollowUps?.length > 0 ? (
        data?.clientFollowUps?.map((followup, index) => (
          <Followups key={index} data={followup} />
        ))
      ) : (
        <div className=" h-[280px] flex items-center justify-center">
          <p className=" text-gray-500">No Follow-ups</p>
        </div>
      )}
    </div>
  );
}
function Followups({ data }) {
  return (
    <div className=" w-full flex flex-col gap-2 items-center ">
      <div className=" h-[.8px] w-full bg-[#ECECEC]"></div>
      <div className=" w-[95%] flex gap-3  items-start px-1  cursor-pointer justify-between">
        <div className="flex gap-3 items-center">
          <div className=" h-[45px] w-[45px] bg-green-500 rounded-md"></div>
          <div>
            <p className=" text-sm text-black font-semibold">{data.name}</p>
            <p className=" text-[#82867E] text-sm">
              {" "}
              {data.followups} days Followup
            </p>
          </div>
        </div>
        <div className=" text-[#82867E] text-[12px] mt-1 font-medium">
          11:00 AM
        </div>
      </div>
    </div>
  );
}
