import { Modal } from "@mui/material";
import { MeetingSuccessIcon } from "@/components/svgs";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import apiInstance from "@/helpers/api";
import Loader from "@/components/loader/Loader";

function DeleteModal({ setIsDeleteModal, isDeleteModal, clientid }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);
      const { status } = await apiInstance.deleteClient(clientid);
      if (status) {
        toast.success("Client deleted successfully");
        router.back();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("deleteClient error => ", error);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className=" p-5 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <Modal
      onClose={setIsDeleteModal}
      open={isDeleteModal}
      className=" flex items-center justify-center"
    >
      <div className="w-[90%] sm:w-[30%] h-[80%] bg-white rounded-2xl flex items-center flex-col">
        <MeetingSuccessIcon h={450} w={400} />
        <p className=" text-[20px] font-semibold -mt-12 text-[#03632C] ">
          Are you sure you want to delete?
        </p>
        <div className=" w-full flex justify-center items-center gap-5 mt-4">
          <button
            onClick={() => setIsDeleteModal(false)}
            className=" py-2 px-5 bg-[#03632C] font-semibold text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className=" py-2 px-5 bg-[#EA4335] font-semibold text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
