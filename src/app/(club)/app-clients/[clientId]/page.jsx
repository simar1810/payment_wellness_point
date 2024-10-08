"use client";
import Loader from "@/components/loader/Loader";
import {
  Mealspage,
  Profileinfo,
  Retailspage,
  Statisticspage,
} from "@/components/pages/clients/[clientid]";
import { Subheader } from "@/components/pages/clients/[clientid]";
import { Backicon } from "@/components/svgs";
import apiInstance from "@/helpers/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Page({ params: { clientId } }) {
  // console.log("params of /app-clients/ => ", params)
  // console.log("clientId => ", clientId)
  const [clientData, setClientData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [Render, setRender] = useState({
    statistics: true,
    meals: false,
    retails: false,
  });

  const fetchClientData = async () => {
    setLoading(true);
    // await new Promise((r) => setTimeout(r, 5000));
    try {
      const { data, status } = await apiInstance.getAppClientDetails(clientId);

      if (status === 200) {
        console.log("response of getApp ClientDetails => ", data);
        setClientData(data?.data ?? {});
      }
    } catch (err) {
      toast.error("Error while fetching client details !");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className=" h-full w-full">
      <div className=" h-[50px] bg-white flex items-center ">
        <div className="flex items-center">
          <button className="cursor-pointer ml-4" onClick={() => router.back()}>
            <Backicon h={14} w={30} c="#000" />
          </button>
          <p className=" font-semibold">Client Details</p>
        </div>
      </div>
      <div className=" lg:h-[calc(100%-50px)] w-full p-3 flex flex-col lg:flex-row gap-3">
        <div className=" h-full w-full lg:w-[35%] bg-white rounded-lg overflow-hidden">
          <Profileinfo
            clientData={clientData}
            fetchClientData={fetchClientData}
          />
        </div>
        <div className=" h-full w-full lg:w-[65%] bg-white rounded-lg overflow-hidden">
          <div className=" h-[50px] w-full ">
            <Subheader Render={Render} setRender={setRender} />
            <div className=" w-full h-[1px] bg-[#F1F1F1] "></div>
          </div>
          <div className=" w-full h-[calc(100%-50px)] -mt-[1px]">
            {Render.statistics && (
              <Statisticspage
                healthMatrix={clientData?.healthMatrix?.healthMatrix[0]}
              />
            )}
            {Render.meals && <Mealspage clientId={clientId} />}
            {Render.retails && <Retailspage clientId={clientId} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
