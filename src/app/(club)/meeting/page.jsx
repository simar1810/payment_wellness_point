"use client";
import React from "react";
import { Meetingdetails } from "@/components/pages/club-dashboard";
import { Backicon } from "@/components/svgs";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  return (
    <div className="h-full w-full py-10 px-4 overflow-scroll scrollbar-hide">
      <div className="w-full bg-white rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-4">
        <button
          className="bg-[#036231] text-white flex items-center gap-2 px-3 py-1 rounded-md ml-4"
          onClick={() => router.back()}
        >
          <Backicon h={15} w={15} c={"white"} />
          Back
        </button>
        <div className="mt-[1.1rem] sm:mt-0 p-1 overflow-scroll scrollbar-hide">
          <Meetingdetails showEntries={undefined} />
        </div>
      </div>
    </div>
  );
}

export default Page;
