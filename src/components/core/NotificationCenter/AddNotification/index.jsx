import apiInstance from "@/helpers/api";
import useOutsideClick from "@/hooks/useOutsideClick";
import { Modal } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

const AddNotificationModal = ({
  isAddNotificationModalOpen,
  setIsAddNotificationModalOpen,
}) => {
  const [notification, setNotification] = useState({
    clients: [],
    heading: "",
    details: "",
  });
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [notificationSent, setNotificationSent] = useState(false);
  const [notificationLoading, setNotificationLoading] = useState(false);

  // console.log("notification => ", notification);

  useEffect(() => {
    async function fetchClients() {
      setLoading(true);
      try {
        // const { data, status } = await apiInstance.getAllAppClients();
        const { data, status } = await apiInstance.getAllClients();
        if (status === 200) {
          // console.log("data of getAllClients => ", data);
          setClients(data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("fetch All Dashboard error => ", error);
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  useOutsideClick(dropdownRef, () => setDropdownOpen(false));

  const handleCheckboxChange = (id) => {
    if (notification.clients.includes(id)) {
      setNotification({
        ...notification,
        clients: notification.clients.filter((clientId) => clientId !== id),
      });
    } else {
      setNotification({
        ...notification,
        clients: [...notification.clients, id],
      });
    }
  };

  const handleSelectAll = () => {
    if (notification.clients.length === clients.length) {
      setNotification({ ...notification, clients: [] });
    } else {
      setNotification({
        ...notification,
        clients: clients.map((client) => client._id),
      });
    }
  };

  const handleSendNotification = async (e) => {
    e.preventDefault();
    // console.log("notification => ", notification);
    const keys = ["clients", "heading", "details"];
    for (const key of keys) {
      if (!notification[key] || notification[key]?.length === 0) {
        toast.error(`${key} is required`);
        return;
      }
    }
    try {
      setNotificationLoading(true);
      const { status } = await apiInstance.sendNotification({
        ...notification,
        clientsType: "club",
      });
      if (status === 200) {
        // console.log("Notification sent successfully");
        toast.success("Notification sent successfully");
        setNotificationSent(true);
      }
      setNotificationLoading(false);
    } catch (error) {
      console.error("send notification error => ", error);
      toast.error(
        error?.response?.data?.message || "Failed to send notification"
      );
      setNotificationSent(false);
      setNotificationLoading(false);
    }
  };

  return (
    <Modal
      open={isAddNotificationModalOpen}
      //   onClose={() => setIsAddNotificationModalOpen(false)}
      contentLabel="Add Notification Modal"
      className="flex items-center justify-center"
    >
      <div className="min-w-[400px]">
        <div className="bg-[#036231] flex items-center p-4 justify-center rounded-t-2xl relative">
          <div className="text-white text-[1.3rem] flex justify-center items-center relative w-full">
            Notification
          </div>
          <button
            className="cursor-pointer absolute right-5"
            onClick={() => setIsAddNotificationModalOpen(false)}
          >
            <RxCross2 fontSize={25} color="#fff" />
          </button>
        </div>

        {!notificationSent ? (
          <form
            className="bg-white p-4 px-6 rounded-b-2xl min-h-[450px] flex flex-col justify-between"
            onSubmit={handleSendNotification}
          >
            <div className="flex flex-col gap-4">
              <div className="relative w-full">
                <div
                  className={`border-2 border-gray-300 rounded-md p-3 cursor-pointer outline-none ${notification?.clients && notification.clients.length > 0 ? 'text-gray-600' : 'text-gray-400'}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {notification?.clients && notification.clients.length > 0
                    ? `${notification.clients.length} Recepeints Selected`
                    : `Receipents`}
                </div>
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-10 w-full bg-white border rounded shadow-lg mt-1"
                  >
                    {loading ? (
                      <div className="flex-col gap-4 w-full flex items-center justify-center p-3">
                        <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
                      </div>
                    ) : clients.length === 0 ? (
                      <div className="p-2 text-center">No clients found</div>
                    ) : (
                      <div>
                        <div
                          className="flex justify-between items-center p-2 px-4 cursor-pointer"
                          onClick={handleSelectAll}
                        >
                          All
                          <div className="relative flex items-center rounded-full cursor-pointer">
                            <input
                              type="checkbox"
                              checked={
                                notification.clients.length === clients.length
                              }
                              className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500  border-gray-400"
                              readOnly
                            />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="1"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                        {clients.map(
                          (client) =>
                            client && (
                              <div
                                key={client?._id}
                                className="flex justify-between items-center p-2 px-4 cursor-pointer"
                              >
                                {client?.name}
                                <div className="relative flex items-center rounded-full cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={notification.clients.includes(
                                      client?._id
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange(client?._id)
                                    }
                                    className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500  border-gray-400"
                                  />
                                  <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-3.5 w-3.5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      stroke="currentColor"
                                      strokeWidth="1"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <input
                type="text"
                placeholder="Title"
                className="border-2 border-gray-300 rounded-md p-3 outline-none"
                onChange={(e) =>
                  setNotification({ ...notification, heading: e.target.value })
                }
              />
              <textarea
                placeholder="Details"
                className="border-2 border-gray-300 rounded-md p-3 outline-none min-h-40"
                onChange={(e) =>
                  setNotification({ ...notification, details: e.target.value })
                }
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#036231] w-full text-white py-2 rounded-md mt-4 flex justify-center"
            >
              {notificationLoading ? (
                <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
              ) : (
                "Send Notification"
              )}
            </button>
          </form>
        ) : (
          <div className="bg-white p-4 px-6 rounded-b-2xl min-h-[450px] flex flex-col justify-center items-center">
            <Image
              src="/Confirmed-cuate.png"
              width={200}
              height={200}
              alt="Notification Sent"
            />
            <div className=" text-xl">Notification has been Sent</div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddNotificationModal;
