"use client";
import Loader from "@/components/loader/Loader";
import { Header, Person } from "@/components/pages/clients";
import AddClientPopup from "@/components/pages/clients/addClient";
import apiInstance from "@/helpers/api";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Page() {
  const [appClients, setAppClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  async function fetchAllAppClients() {
    setLoading(true);
    try {
      const { data, status } = await apiInstance.getAllAppClients();

      if (status === 200) {
        // console.log("response of fetch All App Clients => ", data);
        setAppClients(data?.data ?? []);
      }
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message || "Error while fetching app clients"
      );
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchAllAppClients();
  }, []);

  useEffect(() => {
    fetchAllAppClients();
  }, [isAddClientModalOpen]);

  return (
    <section className=' h-full w-full bg-[#f4f4f4] p-3 '>
      <div className=' h-full w-full bg-white rounded-lg p-5 overflow-scroll scrollbar-hide'>
        <div className=' w-full'>
          <Header
            data={appClients}
            setAppClients={setAppClients}
            setIsAddClientModalOpen={setIsAddClientModalOpen}
          />
        </div>
        {loading ? (
          <Loader />
        ) : !appClients || appClients.length === 0 ? (
          <div className='mx-auto w-full h-[50%] flex justify-center items-center'>
            No Client Yet
          </div>
        ) : (
          <div className=' w-full grid grid-cols-2 gap-x-16 gap-y-4 mt-6 '>
            {appClients.map(
              (data, index) => data && <Person key={index} data={data} />
            )}
          </div>
        )}
      </div>

      {/* {isAddClientModalOpen && ( */}
      <AddClientPopup
        isAddClientModalOpen={isAddClientModalOpen}
        setIsAddClientModalOpen={setIsAddClientModalOpen}
      />
      {/* )} */}
    </section>
  );
}

export default Page;
