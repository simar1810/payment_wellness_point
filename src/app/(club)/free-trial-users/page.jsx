"use client";
import { EyeIcon } from "@/components/svgs";
import apiInstance from "@/helpers/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
   return <>
      <div className="bg-white m-6 p-4 rounded-lg">
         <h1 className="text-[24px] font-semibold mb-12">Free trial Users</h1>
         <div className="w-[350%] md:w-[250%] xl:w-full mt-4 px-3 text-sm font-bold flex justify-around gap-1 border-b-2 pb-4">
            <p className="w-[5%] flex justify-center">Sr.no</p>
            <p className="w-[12%] flex justify-center">Customer Name</p>
            <p className="w-[12%] flex justify-center">Phone Number</p>
            <p className="w-[12%] flex justify-center">Created At</p>
            <p className="w-[10%] flex justify-center">City</p>
            <p className="w-[10%] flex justify-center">Roll No</p>
            <p className="w-[12%] flex justify-center">Sponsored By</p>
            <p className="w-[12%] flex justify-center">Attendance</p>
            <p className="w-[12%] flex justify-center">Actions</p>
         </div>
      </div>
   </>
}

export function FreeTrialUsers({ startidx }) {
   const [allClients, setAllClients] = useState([]);
   useEffect(function () {
      (async function () {
         try {
            const response = await apiInstance.getFreeTrialUsers();
            if (response.data.success) setAllClients(response.data.payload)
         } catch (error) {
            toast.error(error?.response.message || error.message)
         }
      })()
   }, [])

   return <div className="px-3">
      {allClients.map((client, idx) => <UserItem
         key={client._id}
         idx={idx + 1 + startidx}
         client={client}
      />)}
   </div>
}

function UserItem({ idx, client }) {
   if (!client) return <></>

   return <div className="w-[350%] md:w-[250%] xl:w-full text-[10px] font-[500] mt-4 text-sm flex justify-around gap-1 border-b-[1px] pb-4">
      <p className="w-[5%] flex justify-center">{idx}</p>
      <p className="w-[12%] flex justify-center">{client.name}</p>
      <p className="w-[10%] flex justify-center">{client.rollno}</p>
      <p className="w-[12%] flex justify-center">{client.sponsor}</p>
      <p className="w-[12%] flex justify-center">{client.phoneNumber}</p>
      {/* <p className="w-[12%] flex justify-center">{new Date(client.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}</p> */}
      {/* <p className="w-[10%] flex justify-center">{client.city}</p> */}
      <p className="w-[10%] flex justify-center">{client?.attendance?.length}</p>
      <div className="w-[12%] flex justify-center">
         <button className="w-full h-[30px] max-w-[98px] mx-auto text-white bg-gray-900 rounded">Free trial</button>
      </div>
      <Link className="w-[5%] flex justify-center" href={`/club-clients/${client._id}?type=3`}>
         <EyeIcon h={20} w={25} c="black" />
      </Link>
   </div>
}