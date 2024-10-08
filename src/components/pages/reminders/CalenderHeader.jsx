import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";

const CalendarHeader = ({ currentDate, selectedDate, setSelectedDate }) => {
  const [dates, setDates] = useState([]);

  const containerRef = useRef(null);

  useEffect(() => {
    const generateDates = () => {
      const datesArray = [];
      for (let i = -15; i <= 15; i++) {
        datesArray.push(dayjs().add(i, "day"));
      }
      setDates(datesArray);
    };

    generateDates();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const currentDateElement =
        containerRef.current.querySelector(".current-date");
      if (currentDateElement) {
        const containerWidth = containerRef.current.offsetWidth;
        const elementWidth = currentDateElement.offsetWidth;
        const elementLeft = currentDateElement.offsetLeft;

        const scrollLeft = elementLeft - containerWidth / 2 + elementWidth / 2;
        containerRef.current.scrollLeft = scrollLeft - 275;
      }
    }
  }, [dates]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div
      className='overflow-x-scroll scrollbar-hide border-b-2 px-6 py-2 '
      ref={containerRef}
    >
      <div className='flex space-x-8 p-4'>
        {dates.map((date, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(date)}
            className={`flex-shrink-0 w-16 p-2 text-center flex flex-col items-center gap-1 rounded-md cursor-pointer ${date.isSame(currentDate, "day") &&
                selectedDate.isSame(currentDate, "day")
                ? "bg-green-200 opacity-80 text-black current-date"
                : date.isSame(selectedDate, "day")
                  ? "bg-green-200 opacity-80 text-black"
                  : "text-gray-400"
              }`}
          >
            <div className='text-lg font-bold text-black'>
              {date.format("D")}
            </div>
            <div className='text-sm '>{date.format("ddd")}</div>

            {date.isSame(selectedDate, "day") && (
              <div className='w-2 h-2 bg-[#036231] rounded-full mt-2'></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarHeader;
