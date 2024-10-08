"use client";
import { Backicon } from "@/components/svgs";
import { useRouter } from "next/navigation";
import React from "react";

function Backbutton() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/meeting")}
      className=" flex items-center gap-2 text-xl font-semibold cursor-pointer"
    >
      <Backicon h={20} w={40} c={"black"} />
      Meetings
    </div>
  );
}

export default Backbutton;
