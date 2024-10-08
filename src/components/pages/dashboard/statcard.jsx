"use client";
import { Decreaseicon, Increasesvg } from "@/components/svgs";
import Link from "next/link";
import React, { useState } from "react";

function Statcard({
  c,
  quantity,
  title,
  child,
  name,
  redirect = "/app-dashboard",
}) {
  const [increase, setIncrease] = useState(true);

  return (
    <Link
      href={redirect}
      className={`h-[100%] w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg p-4 ${name}`}
    >
      <div>
        <div className=" flex items-start justify-between">
          <div
            className={
              "h-[40px] w-[40px] flex items-center justify-center  rounded-md bg-opacity-15"
            }
            style={{
              backgroundColor: c,
            }}
          >
            {child}
          </div>
          <div className=" mt-1">
            {increase ? (
              <Increasesvg h={20} w={20} />
            ) : (
              <Decreaseicon h={20} w={20} />
            )}
          </div>
        </div>
      </div>
      <p className=" text-[26px] font-semibold mt-4">{quantity}</p>
      <p className=" text-[#82867E] text-[12px] font-semibold">{title}</p>
    </Link>
  );
}

export default Statcard;
