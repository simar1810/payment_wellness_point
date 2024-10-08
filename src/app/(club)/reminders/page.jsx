"use client";
import CalendarHeader from "@/components/pages/reminders/CalenderHeader";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Backicon, Editicon } from "@/components/svgs";
import { IoIosPeople } from "react-icons/io";
import apiInstance from "@/helpers/api";
import { useRouter } from "next/navigation";
import ReminderModal from "@/components/pages/reminders/ReminderModal";

const Page = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [reminders, setReminders] = useState([]);
  const [isAddReminderModalOpen, setIsAddReminderModalOpen] = useState(false);
  const [isUpdateReminderModalOpen, setIsUpdateReminderModalOpen] =
    useState(false);
  const [updateReminderIndex, setUpdateReminderIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const { data, status } = await apiInstance.getReminders();
      // console.log("Fetch Reminders data => ", data);
      if (status === 200) {
        if (data.data.constructor.name === "Array") {
          setReminders(data.data);
        }
      }
    } catch (error) {
      console.log("error => ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  console.log(reminders, "fjkerv");

  const remindersForSelectedDate = reminders
    ?.filter((reminder) => reminder.date === selectedDate.format("YYYY-MM-DD"))
    .sort((a, b) => {
      const timeA = a.time.split(":");
      const timeB = b.time.split(":");
      return (
        parseInt(timeA[0]) * 60 +
        parseInt(timeA[1]) -
        (parseInt(timeB[0]) * 60 + parseInt(timeB[1]))
      );
    });

  // console.log("Reminders => ", remindersForSelectedDate);

  return (
    <div className='w-full h-full'>
      <div className='bg-white border-t flex items-center justify-between p-4'>
        <div className='flex items-center gap-4'>
          <button onClick={() => router.back()} className='cursor-pointer'>
            <Backicon h={18} w={18} c='#000' />
          </button>
          <h1 className='font-bold text-xl'>Reminders</h1>
        </div>
        <button
          className='bg-[#036231] text-white px-4 py-2 rounded-md'
          onClick={() => {
            setIsAddReminderModalOpen(true);
          }}
        >
          + Add Reminder
        </button>
      </div>
      <div className='w-full h-full flex justify-center p-4 px-8'>
        <div className='bg-white rounded-lg w-full max-w-screen-xl h-fit'>
          <CalendarHeader
            currentDate={currentDate}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <div className='p-4 px-6 overflow-scroll scrollbar-hide h-[500px]'>
            <h1 className='text-xl font-bold pl-4'>Schedule Today</h1>
            {loading ? (
              <div className='flex-col gap-4 w-full flex items-center justify-center py-[3px] min-h-52'>
                <div className='w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full'></div>
              </div>
            ) : (
              <div className='mt-4'>
                {remindersForSelectedDate.length > 0 ? (
                  remindersForSelectedDate.map((reminder, index) => (
                    <div key={index} className='p-4 '>
                      <div className='flex gap-6 min-h-20'>
                        <h1 className='text-gray-400'>{reminder.time}</h1>
                        <div className='bg-[#036231] text-white px-4 py-2 rounded-lg w-full relative'>
                          <h1 className='font-bold'>{reminder.topic}</h1>
                          <p className='text-sm'>{reminder.agenda}</p>
                          <div className='mt-2 flex items-center'>
                            <div className='flex justify-center items-center rounded-full w-8 h-8 bg-white text-black relative z-[1px] -mr-2'>
                              {reminder?.coach?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className='flex justify-center items-center rounded-full w-8 h-8 bg-slate-300 text-black relative'>
                              {reminder?.client?.name?.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <button
                            className='bg-white rounded-md p-2 absolute right-4 top-2 text-[#036231] cursor-pointer'
                            onClick={() => {
                              setIsUpdateReminderModalOpen(true);
                              setUpdateReminderIndex(index);
                            }}
                          >
                            <Editicon h={12} w={12} c='#036231' />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='flex flex-col items-center justify-center gap-2 min-h-[300px] text-gray-500'>
                    <div className='bg-[#90C8444D] rounded-full p-4'>
                      <IoIosPeople fontSize={40} color='#036231' />
                    </div>
                    <h1 className='text-lg font-semibold mt-2'>
                      No Reminders Yet
                    </h1>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isAddReminderModalOpen && (
        <ReminderModal
          isAddReminderModalOpen={isAddReminderModalOpen}
          setIsAddReminderModalOpen={setIsAddReminderModalOpen}
          fetchReminders={fetchReminders}
        />
      )}

      {isUpdateReminderModalOpen && (
        <ReminderModal
          isAddReminderModalOpen={isUpdateReminderModalOpen}
          setIsAddReminderModalOpen={setIsUpdateReminderModalOpen}
          fetchReminders={fetchReminders}
          mode='update'
          reminderData={remindersForSelectedDate[updateReminderIndex]}
        />
      )}
    </div>
  );
};

export default Page;
