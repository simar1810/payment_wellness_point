"use client";
import {
  RequestedVPsModal,
  SingleClient,
} from "@/components/pages/volumepoints";
import React, { useState, useEffect } from "react";
import apiInstance from "@/helpers/api";
import { NoDataPage } from "@/components/core";
import { Backicon } from "@/components/svgs";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import { SITE_URL } from "@/helpers/apiConfig";
import toast from "react-hot-toast";

function Page() {
  const router = useRouter();

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestedVPsModal, setRequestedVPsModal] = useState(false);

  async function FetchVolumePointsdata() {
    setLoading(true);
    try {
      const { data, status } = await apiInstance.clubClientsWithVP();
      if (status === 200) {
        const newClients = data.data.sort(
          (a, b) => parseFloat(a.activePoints) - parseFloat(b.activePoints)
        );

        // console.log("newClients => ", newClients);
        setClients(data.data);
      }
    } catch (error) {
      console.error("fetch All VolumePoints error => ", error);
    }
    setLoading(false);
  }

  function copyVpFormLink() {
    const link = `${SITE_URL}/volume-point-form`;
    navigator.clipboard.writeText(link);
    toast("Volume PointForm link copied to clipboard!");
  }

  useEffect(() => {
    FetchVolumePointsdata();
  }, []);

  if (loading) {
    return (
      <div className="p-5 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4">
      <div className=" bg-white min-h-screen w-full rounded-lg p-5 flex flex-col gap-2 max-[400px]:p-2">
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className=" bg-[#036231] text-white flex items-center gap-2 px-3 py-1 rounded-md"
              onClick={() => router.back()}
            >
              <Backicon h={15} w={15} c={"white"} />
              Back
            </button>

            <p className="font-bold text-xl">Volume Points</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => {
                setRequestedVPsModal(true);
              }}
              className="px-4 py-1 h-[35px] cursor-pointer text-[#036231] border-2 border-[#036231] text-[14px] font-semibold bg-white flex items-center justify-center gap-2 rounded-md"
            >
              Requested Volme Points
            </button>
            <button
              onClick={copyVpFormLink}
              className="px-4 py-1 h-[35px] cursor-pointer text-white text-[14px] font-semibold bg-[#036231] flex items-center justify-center gap-2 rounded-md"
            >
              Send VP Form
            </button>
          </div>
        </div>

        {clients.length === 0 ? (
          <NoDataPage message=" No Client Available" />
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-4 mt-6">
            {clients &&
              clients.map((client, index) => (
                <SingleClient key={index} client={client} />
              ))}
          </div>
        )}
      </div>

      {requestedVPsModal && (
        <RequestedVPsModal
          requestedVPsModal={requestedVPsModal}
          setRequestedVPsModal={setRequestedVPsModal}
        />
      )}
    </div>
  );
}

export default Page;
