import Link from "next/link";
import { Boxheader } from ".";
import { HiOutlineVideoCamera } from "react-icons/hi";

export default function Reminders({ data }) {
  const recentReminders = data
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className='w-full min-h-[320px] reminders'>
      <div className='px-2 sticky top-0 bg-white'>
        <Boxheader
          title={"Remiders"}
          data={data}
          redirect={{
            path: "/reminders",
            text: "Add Reminder",
          }}
        />
      </div>
      <div className='mt-2 flex flex-col  items-center gap-1 min-h-[280px]'>
        {recentReminders.length === 0 ? (
          <div className='w-full h-[200px] flex flex-col gap-4 items-center justify-center'>
            <p>No Reminders available</p>
            {/* <Link href='/notes'>
              <button className='text-white px-2 py-2 rounded-md  bg-[#036231] min-w-[135px]'>
                Add Notes
              </button>
            </Link> */}
          </div>
        ) : (
          <>
            {recentReminders.map((note, index) => (
              <>
                <Reminder key={index} data={note} />
                {index !== data.length - 1 && (
                  <div className='w-full h-[1px] bg-gray-200'></div>
                )}
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function Reminder({ data }) {
  return (
    <div className='w-full flex flex-col gap-2 p-2'>
      <p className='text-sm font-semibold'>{data.topic}</p>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-400'>{data.agenda}</p>
        {/*    <button className='flex items-center justify-center gap-2   border-2 border-[#036231] rounded-lg text-[#036231] p-1 px-2 text-[12px]'>
          <HiOutlineVideoCamera fontSize={20} color='#036231' />
          Join Meet
        </button> */}
      </div>
      <p className='text-sm text-gray-400'>
        {data?.date} ({data?.time})
      </p>
    </div>
  );
}
