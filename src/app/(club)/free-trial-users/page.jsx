"use client";
import apiInstance from "@/helpers/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
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
            {/* <p className="w-[12%] flex justify-center">Actions</p> */}
         </div>
         <div>
            {allClients.map((client, idx) => <UserItem
               key={client._id}
               idx={idx + 1}
               client={client}
            />)}
         </div>
      </div>
   </>
}

function UserItem({ idx, client }) {
   if (!client) return <></>

   return <div className="w-[350%] md:w-[250%] xl:w-full mt-4 px-3 text-sm flex justify-around gap-1 border-b-2 pb-4">
      <p className="w-[5%] flex justify-center">{idx}</p>
      <p className="w-[12%] flex justify-center">{client.name}</p>
      <p className="w-[12%] flex justify-center">{client.phoneNumber}</p>
      <p className="w-[12%] flex justify-center">{new Date(client.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}</p>
      <p className="w-[10%] flex justify-center">{client.city}</p>
      <p className="w-[10%] flex justify-center">{client.rollno}</p>
      <p className="w-[12%] flex justify-center">{client.sponsor}</p>
      <p className="w-[12%] flex justify-center">{client?.attendance?.length}</p>
      {/* <Link className="w-[12%] flex justify-center" href={`/club-clients/${client._id}`}>
         <EyeIcon h={20} w={25} c={"black"} />
      </Link> */}
   </div>
}