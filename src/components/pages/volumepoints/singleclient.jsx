"use client";
import React from "react";
import Image from "next/image";
import { ForwardIcon, WarningIcon } from "@/components/svgs";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setDetailsTab } from "@/redux/slices/userSlice";

function SingleClient({ client }) {
  let { clientId, activePoints, totalPoints } = client;
  activePoints = Math.max(0, parseFloat(activePoints));
  activePoints = activePoints.toFixed(2);
  const daysLeft = Math.floor(activePoints / 3.33);
  const fixedDays = daysLeft.toFixed(0);

  const router = useRouter();
  const dispatch = useDispatch();
  // console.log(clientId._id);

  return (
    <div className=" w-full ">
      <div className=" h-[1.2px] w-full bg-[#ECECEC]"></div>

      <div className=" w-full  mt-2 flex justify-between items-center">
        <div className=" flex gap-2 ">
          <div className=" h-[55px] w-[55px] rounded-md overflow-hidden max-[550px]:h-[40px] max-[550px]:w-[40px]">
            <Image
              src={
                clientId?.profilePhoto && clientId?.profilePhoto.length > 0
                  ? clientId?.profilePhoto
                  : "/default-user-dp.svg"
              }
              alt=""
              width={0}
              height={0}
              unoptimized
              className=" h-full w-full"
            />
          </div>

          <div className=" w-[calc(100%-40px)]">
            <div className=" flex gap-3 items-center ">
              <div className=" text-[18px] font-bold max-[550px]:text-base">
                {clientId?.name && clientId?.name.length > 0
                  ? clientId?.name
                  : "N/A"}
              </div>
              <div
                className={`text-sm font-semibold  flex items-center gap-1 ${activePoints <= 20 ? "text-[#FF5959]" : "text-[#036231]"
                  }`}
              >
                {activePoints <= 20 ? (
                  <WarningIcon h={18} w={18} c={"#FF5959"} />
                ) : (
                  ""
                )}

                <p className=" max-[550px]:text-sm">
                  {isNaN(activePoints) ? 0 : activePoints} Points Remaining |{" "}
                  {fixedDays} Day Remaining
                </p>
              </div>
            </div>

            <div className="relative h-2 w-[350px] bg-gray-300 rounded-full mt-2 max-[550px]:w-[250px]">
              <div
                className={`absolute top-0 h-full bg-[#036231] rounded-full`}
                style={{
                  width: `${Math.min((activePoints / 100) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            router.push(`/club-clients/${clientId._id}`);
            dispatch(
              setDetailsTab({
                tab: "clubClientDetailsTab",
                value: "VolumePoints",
              })
            );
          }}
          className=" -mt-4 cursor-pointer"
        >
          <ForwardIcon h={25} w={25} c={"#036231"} />
        </div>
      </div>
    </div>
  );
}

export default SingleClient;
