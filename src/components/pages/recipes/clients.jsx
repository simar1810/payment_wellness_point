import React from "react";
import Image from "next/image";

function Clients({ data, clientId, setClientId }) {
  const handleCheckboxChange = () => {
    setClientId(data?._id || "");
  };

  return (
    <div className='w-full flex flex-col gap-2'>
      <div className='h-[.9px] w-full bg-[#ECECEC]'></div>
      <div className='w-full flex justify-between items-center'>
        <div className='flex gap-3 items-center w-[150px]'>
          <div className='h-[50px] w-[50px] rounded-md relative'>
            {data?.profilePhoto ? (
              <Image
                src={data?.profilePhoto}
                alt='Profile'
                height={0}
                width={0}
                className='h-full w-full rounded-md'
                unoptimized
              />
            ) : (
              <div className=' h-[45px] w-[45px] bg-green-500 rounded-md'></div>
            )}

            <div
              className={`h-[15px] w-[15px] rounded-full border-[2px] -bottom-1 -right-1 border-solid border-white absolute z-20 ${
                data?.isActive ? "bg-[#83C529]" : "bg-[#F46870]"
              }`}
            ></div>
          </div>
          <p className='font-semibold'>{data?.name ?? "N/A"}</p>
        </div>
        <label
          className='relative flex items-center p-3 rounded-full cursor-pointer'
          htmlFor={`client-checkbox-${data?.id ?? ""}`}
        >
          <input
            type='checkbox'
            checked={clientId === data?._id || ""}
            onChange={handleCheckboxChange}
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500  border-gray-400"
            id={`client-checkbox-${data?.id ?? ""}`}
          />
          <span className='absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3.5 w-3.5'
              viewBox='0 0 20 20'
              fill='currentColor'
              stroke='currentColor'
              stroke-width='1'
            >
              <path
                fill-rule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clip-rule='evenodd'
              ></path>
            </svg>
          </span>
        </label>
      </div>
    </div>
  );
}

export default Clients;
