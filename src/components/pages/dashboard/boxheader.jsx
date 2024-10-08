import { useRouter } from "next/navigation";
import React from "react";

function Boxheader({
  title,
  data = [],
  setOpenViewAllModal = () => { },
  newGoalAdded,
  redirect = null,
}) {
  const router = useRouter();
  return (
    <div className='w-full flex justify-between items-center'>
      <div className='flex gap-2'>
        <div className='h-[20px] w-[3px] bg-[#036231]'></div>
        <p className='font-semibold text-sm'>{title}</p>
      </div>

      {(data.length > 3 || redirect) && (
        <div className='relative text-right px-2'>
          <button
            variant='text'
            className='text-[#036231] font-medium underline underline-offset-2 text-sm cursor-pointer'
            onClick={() => {
              redirect ? router.push(redirect.path) : setOpenViewAllModal(true);
            }}
          >
            {redirect ? redirect.text : "View All"}
          </button>
          {newGoalAdded && (
            <span className='animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#036231] opacity-75'></span>
          )}
        </div>
      )}
    </div>
  );
}

export default Boxheader;
