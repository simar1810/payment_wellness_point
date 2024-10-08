"use client";

import { EyeIcon } from "@/components/svgs";
import apiInstance from "@/helpers/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
   const [allClients, setAllClients] = useState([]);
   useEffect(function () {
      (async function () {
         try {
            const response = await apiInstance.getFreeTrialUsers();
            if (response.data.success) setAllClients(response.data.payload)
            console.log(response?.data)
         } catch (error) {
            toast.error(error?.response.message || error.message)
         }
      })()
   }, [])


   // return <></>
   return <>
      <div className="bg-white m-10 p-4 rounded-lg">
         <h1 className="text-[24px] font-semibold mb-12">Free trial Users</h1>
         <div className="w-[350%] md:w-[250%] xl:w-full mt-4 px-3 text-sm font-bold flex justify-around gap-1 border-b-2 pb-4">
            <p className="w-[5%] flex justify-center">Sr.no</p>
            <p className="w-[12%] flex justify-center">Customer Name</p>
            <p className="w-[12%] flex justify-center">Phone Number</p>
            <p className="w-[12%] flex justify-center">Joining Date</p>
            <p className="w-[10%] flex justify-center">City</p>
            <p className="w-[10%] flex justify-center">Roll No</p>
            <p className="w-[12%] flex justify-center">Sponsored By</p>
            <p className="w-[12%] flex justify-center">Actions</p>
         </div>
         <div>
            {allClients.map((client, idx) => (client.clientId || client.user) ? <UserItem key={client._id} idx={idx + 1} client={client.clientId || client.user} /> : <></>)}
         </div>
      </div>
   </>
}

function UserItem({ idx, client }) {
   return <div className="w-[350%] md:w-[250%] xl:w-full mt-4 px-3 text-sm flex justify-around gap-1 border-b-2 pb-4">
      <p className="w-[5%] flex justify-center">{idx}</p>
      <p className="w-[12%] flex justify-center">{client.name}</p>
      <p className="w-[12%] flex justify-center">{client.mobileNumber}</p>
      <p className="w-[12%] flex justify-center">{client.joiningDate}</p>
      <p className="w-[10%] flex justify-center">{client.city}</p>
      <p className="w-[10%] flex justify-center">{client.rollno}</p>
      <p className="w-[12%] flex justify-center">{client.sponseredByName}</p>
      <Link className="w-[12%] flex justify-center" href={`/club-clients/${client._id}`}>
         <EyeIcon h={20} w={25} c={"black"} />
      </Link>
   </div>
}