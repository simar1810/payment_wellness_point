import { TimePickerComponent } from "@/components/core";
import { DatePicker, TimePicker } from "@/components/core/inputs";
import apiInstance from "@/helpers/api";
import useOutsideClick from "@/hooks/useOutsideClick";
import { Modal } from "@mui/material";
import { set } from "lodash";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

const ReminderModal = ({
  isAddReminderModalOpen,
  setIsAddReminderModalOpen,
  fetchReminders,
  mode = "add",
  reminderData = null,
}) => {
  const [appointmentData, setAppointmentData] = useState({
    topic: "",
    date: "",
    time: "",
    agenda: "",
    client: "",
  });
  const [time, setTime] = useState("");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (reminderData) {
      setAppointmentData({
        topic: reminderData.topic,
        date: reminderData.date,
        time: reminderData.time,
        agenda: reminderData.agenda,
        client: reminderData.client,
      });
    }
  }, [reminderData]);

  useEffect(() => {
    if (mode === "add") {
      async function fetchClients() {
        setLoading(true);
        try {
          const { data, status } = await apiInstance.getAllAppClients();
          if (status === 200) {
            setClients(data.data);
          }
          setLoading(false);
        } catch (error) {
          console.log("fetch All Dashboard error => ", error);
          setLoading(false);
        }
      }

      fetchClients();
    }
  }, [mode]);

  useOutsideClick(dropdownRef, () => setDropdownOpen(false));

  const onCloseHandler = () => {
    setIsAddReminderModalOpen(false);
  };

  const handleCheckboxChange = (id, name) => {
    setAppointmentData((prev) => ({
      ...prev,
      client: id,
      clientName: name,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({
      ...prev,
      [name]: value,
      time: handleTime(),
    }));
  };

  function handleTime() {
    const hour = time.$H <= 9 ? `0${time.$H}` : `${time.$H}`;
    const minute = time.$m <= 9 ? `0${time.$m}` : `${time.$m}`;
    const newTime = `${hour}:${minute}`;
    return newTime;
  }

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setAppointmentData((prev) => ({
      ...prev,
      time: handleTime(),
    }));
    const keys = ["topic", "date", "time", "agenda"];
    if (mode === "add") keys.push("client");
    for (let key of keys) {
      if (!appointmentData[key]) {
        toast.error(`${key} is required`);
        return;
      }
    }
    try {
      setLoading(true);
      const { clientName, ...rest } = appointmentData;
      let responseData = null;
      if (mode === "add") {
        responseData = await apiInstance.addReminder(rest);
      } else if (mode === "update" && reminderData) {
        responseData = await apiInstance.updateReminder(reminderData._id, rest);
      }
      if (responseData && responseData.status === 200) {
        toast.success(
          mode === "add"
            ? "Reminder added successfully"
            : "Reminder updated successfully"
        );
        setIsAddReminderModalOpen(false);
        fetchReminders();
      }
    } catch (error) {
      console.log("Add/Update Reminder error => ", error);
      mode === "add"
        ? toast.error("Failed to add reminder")
        : toast.error("Failed to update reminder");
    } finally {
      setLoading(false);
    }
  };

  console.log("Appointment Data => ", appointmentData);

  return (
    <Modal
      open={isAddReminderModalOpen}
      onClose={() => setIsAddReminderModalOpen(false)}
      className='flex items-center justify-center'
    >
      <div className='w-[30%] outline-none'>
        <div className='h-[2rem] bg-[#036231] flex items-center p-[2rem] justify-center rounded-t-2xl'>
          <div className='text-white text-[1.3rem] flex justify-center items-center relative w-full'>
            {mode === "add" ? "Add Reminder" : "Update Reminder"}
            <button
              className='cursor-pointer absolute right-0'
              onClick={onCloseHandler}
            >
              <RxCross2 />
            </button>
          </div>
        </div>
        <form
          className='p-4 px-5 bg-white rounded-b-2xl min-h-[500px] flex flex-col justify-between'
          onSubmit={handleAppointmentSubmit}
        >
          <div className='flex flex-col gap-4'>
            <input
              type='text'
              placeholder='Topic'
              name='topic'
              value={appointmentData.topic}
              className='w-full border border-gray-300 rounded-md p-3 outline-none'
              onChange={handleChange}
            />
            <DatePicker
              name={"date"}
              value={appointmentData.date}
              onChange={handleChange}
              placeholder={"Date"}
            />
            <TimePickerComponent setTime={setTime} className=' w-full' />
            <textarea
              placeholder='Agenda'
              name='agenda'
              className='w-full border border-gray-300 rounded-md p-3 outline-none min-h-24'
              onChange={handleChange}
              value={appointmentData.agenda}
            />
            {mode === "add" && (
              <div className='relative w-full'>
                <div
                  className={`border-2 border-gray-300 rounded-md p-3 cursor-pointer outline-none ${appointmentData.client ? "" : "text-gray-400"
                    }`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {appointmentData.clientName
                    ? appointmentData.clientName
                    : "Participants"}
                </div>
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className='absolute z-10 w-full bg-white border rounded shadow-lg mt-1'
                  >
                    {loading ? (
                      <div className='flex-col gap-4 w-full flex items-center justify-center p-3'>
                        <div className='w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full'></div>
                      </div>
                    ) : clients.length === 0 ? (
                      <div className='p-2 text-center'>No clients found</div>
                    ) : (
                      <div>
                        {clients.map(
                          (client) =>
                            client && (
                              <div
                                key={client._id}
                                className='flex justify-between items-center p-2 px-4 cursor-pointer'
                              >
                                {client.name}
                                <div className='relative flex items-center rounded-full cursor-pointer'>
                                  <input
                                    type='checkbox'
                                    checked={
                                      appointmentData.client === client._id
                                    }
                                    onChange={() =>
                                      handleCheckboxChange(
                                        client._id,
                                        client.name
                                      )
                                    }
                                    className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500  border-gray-400"
                                  />
                                  <span className='absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100'>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      className='h-3.5 w-3.5'
                                      viewBox='0 0 20 20'
                                      fill='currentColor'
                                      stroke='currentColor'
                                      strokeWidth='1'
                                    >
                                      <path
                                        fillRule='evenodd'
                                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                        clipRule='evenodd'
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
            )}
          </div>
          <button
            className='bg-[#036231] text-white px-4 py-3 rounded-md'
            type='submit'
          >
            {loading ? (
              <div className='flex-col gap-4 w-full flex items-center justify-center py-[3px] '>
                <div className='w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full'></div>
              </div>
            ) : mode === "add" ? (
              "Add Reminder"
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ReminderModal;
