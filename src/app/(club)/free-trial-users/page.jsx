"use client";
import { EyeIcon } from "@/components/svgs";
import apiInstance from "@/helpers/api";
import { Modal } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";

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
   const [deps, setDeps] = useState(false)

   useEffect(function () {
      (async function () {
         try {
            const response = await apiInstance.getFreeTrialUsers();
            if (response.data.success) {
               console.log(response.data.payload)
               const sortedUsers = response.data.payload
                  .map(user => ({ ...user, sortedRollno: user.rollno.slice(response.data.rollNumberLength) }))
                  .sort((a, b) => a.sortedRollno - b.sortedRollno)
               setAllClients(sortedUsers)
            }
         } catch (error) {
            toast.error(error?.response?.message || error.message)
         }
      })()
   }, [deps])

   return <div className="px-3">
      {allClients.map((client, idx) => <UserItem
         key={client._id}
         idx={idx + 1 + startidx}
         client={client}
         refreshData={() => setDeps(prev => !prev)}
      />)}
   </div>
}

function UserItem({ idx, client, refreshData }) {
   const [deleteWarningModal, setDeleteWarningModal] = useState(false)

   async function deleteFreeUser() {
      try {
         const response = await apiInstance.deleteFreeUser(client._id)
         console.log(response)
         if (response.status === 200) {
            console.log("hit")
            toast.success(response?.data?.message || "Customer deleted successfully!")
            refreshData()
         }
      } catch (error) {
         toast.error(error?.response?.data?.message || "Please try again later!")
      }
   }

   if (!client) return <></>

   return <div className="xl:w-full text-[10px] font-[500] mt-1 text-sm flex items-center justify-around gap-1 border-b-[1px] pb-1">
      <p className="w-[5%] flex justify-center">{idx}</p>
      <p className="w-[12%] flex justify-center">{client.name}</p>
      <p className="w-[10%] flex justify-center">{client.rollno}</p>
      <p className="w-[12%] flex justify-center">{client.sponsor}</p>
      <p className="w-[12%] flex justify-center">{client.phoneNumber}</p>
      {/* <p className="w-[12%] flex justify-center">{new Date(client.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}</p> */}
      {/* <p className="w-[10%] flex justify-center">{client.city}</p> */}
      <p className="w-[10%] flex justify-center">{client?.attendance?.length}</p>
      <div className="w-[12%] flex justify-center">
         <button className="w-full h-[30px] max-w-[98px] mx-auto text-white bg-gray-900 rounded">Guest</button>
      </div>
      <div className="w-[5%] flex items-center justify-center gap-1">
         <Link href={`/club-clients/${client._id}?type=3`} className="mt-1">
            <EyeIcon h={20} w={25} c="black" />
         </Link>
         <FiTrash2
            onClick={() => setDeleteWarningModal(true)}
            className="w-6 h-6 cursor-pointer" />
      </div>
      <WarningModal
         onClose={() => setDeleteWarningModal(false)}
         onCallback={deleteFreeUser}
         opened={deleteWarningModal} />
   </div>
}

function WarningModal({ opened, onClose, onCallback }) {
   return <Modal
      open={opened}
      onClose={onClose}
      className="flex items-center justify-center">
      <div className="w-full max-w-[500px] bg-white mx-2 p-4 rounded-md relative">
         <FaXmark
            onClick={onClose}
            className="w-6 h-6 absolute top-4 right-4"
         />
         <p className="text-[20px] font-semibold mb-4">Do You want to Delete the customer?</p>
         <button
            onClick={onCallback}
            className="bg-red-600 text-white px-4 py-2 mr-4 rounded-md">
            Yes
         </button>
         <button
            onClick={onClose}
            className="bg-green-500 text-white px-4 py-2 rounded-md">
            Cancel
         </button>
      </div>
   </Modal>
}