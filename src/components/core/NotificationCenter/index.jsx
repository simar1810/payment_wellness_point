"use client";

import { useEffect, useRef, useState } from "react";
import { FaBell, FaRegBell } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { GoGoal } from "react-icons/go";
import { IoIosArrowRoundBack } from "react-icons/io";
import apiInstance from "@/helpers/api";
import AddNotificationModal from "./AddNotification";

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notificationRef = useRef(null);

  const [isAddNotificationModalOpen, setIsAddNotificationModalOpen] =
    useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        notifications.slice(0, 3).map((notification) => {
          makeAsRead(notification._id);
        });
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  async function fetchNotifications() {
    try {
      const { data, status } = await apiInstance.getNotifications();
      if (status === 200) {
        const notifications = data.data.filter(
          (notification) => !notification.isRead
        );
        setNotifications(notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  const makeAsRead = async (id) => {
    try {
      const { status } = await apiInstance.updateNotification(id);
      if (status === 200) {
        fetchNotifications();
      }
    } catch (error) {
      console.error("Error updating notification", error);
    }
  };

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setIsOpen(false);
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsOpen(false);
    notifications.forEach((notification) => {
      makeAsRead(notification._id);
    });
  };

  function formatNotificationDate(createdDate) {
    const [day, month, year] = createdDate.split("-").map(Number);

    const date = new Date(year, month - 1, day);
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.getTime() === today.getTime()) {
      return "Today";
    }

    if (date.getTime() === yesterday.getTime()) {
      return "Yesterday";
    }

    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  }

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
  };

  return (
    <div className="flex justify-end items-center h-full sticky top-0">
      <div className="w-[calc(100%-90px)] h-full flex justify-end items-center px-8">
        <button
          type="button"
          className="relative cursor-pointer"
          onClick={toggleNotifications}
        >
          <span className="absolute top-[-12px] right-[-12px] bg-red-500 text-white text-xs font-bold h-5 w-5 grid place-items-center rounded-full">
            {notifications.length}
          </span>
          <FaBell fontSize={25} color="#036231" />
        </button>
      </div>

      {isOpen && (
        <Modal open={isOpen} onClose={toggleNotifications} hideBackdrop={true}>
          <div
            className="w-[90%] sm:w-[420px] mt-10 sm:mt-0 ml-5 sm:ml-0 sm:absolute sm:top-16 sm:right-8  bg-white shadow-lg rounded-lg p-5 !z-[1000] "
            ref={notificationRef}
            sx={{
              backgroundColor: "transparent",
            }}
          >
            <div className="flex justify-end pb-2 mb-2">
              {/* <button
              type='button'
              onClick={toggleNotifications}
              className='text-gray-500 hover:text-gray-700'
            >
              <CrossIcon w={20} h={20} c='#036231' />
            </button> */}
            </div>
            <div className="bg-white">
              {notifications.length === 0 && (
                <div className="flex flex-col items-center justify-center h-[150px]">
                  <span className="bg-[#90C8444D] rounded-full p-4">
                    <FaRegBell fontSize={30} color="#036231" />
                  </span>
                  <p className="text-gray-500 mt-4">No notifications</p>
                </div>
              )}
              {notifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="notification-item mb-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#90C8444D] p-[10px] rounded-full">
                      <FaRegBell fontSize={20} className="text-green-500" />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <p className="text-gray-700">{notification.message}</p>
                      <span className="text-sm text-gray-500 self-end">
                        {formatNotificationDate(notification.createdDate)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center flex justify-around mt-4 border-t pt-3">
              {notifications.length > 3 && (
                <button
                  onClick={toggleModal}
                  className="text-green-500 cursor-pointer "
                >
                  See All Notifications
                </button>
              )}
              <button
                className="bg-[#036231] px-4 py-2 rounded-md text-white"
                onClick={() => setIsAddNotificationModalOpen(true)}
              >
                + New Notification
              </button>
            </div>
          </div>
        </Modal>
      )}

      <Modal
        open={isModalOpen}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="w-full"
      >
        <Box
          sx={modalStyle}
          className="max-w-[80%] max-h-[600px] overflow-y-scroll scrollbar-hide"
        >
          <div className="flex gap-2 items-center sticky top-0 bg-white px-6 pt-6 mb-2">
            <button
              onClick={handleModalClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <IoIosArrowRoundBack fontSize={30} color="#000" />
            </button>
            <h2 id="modal-title" className="font-bold text-lg">
              Notifications
            </h2>
          </div>
          <div id="modal-description" className="p-4 px-6">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className="notification-item mb-4 p-4 border-2 rounded-xl w-full"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-[#90C8444D] p-[10px] rounded-full">
                    <FaRegBell fontSize={20} className="text-green-500" />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <p className="text-gray-700 mb-1">{notification.message}</p>
                    <span className="text-sm text-gray-500 self-end">
                      {formatNotificationDate(notification.createdDate)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </Modal>

      {isAddNotificationModalOpen && (
        <AddNotificationModal
          isAddNotificationModalOpen={isAddNotificationModalOpen}
          setIsAddNotificationModalOpen={setIsAddNotificationModalOpen}
        />
      )}
    </div>
  );
};

export default NotificationCenter;
