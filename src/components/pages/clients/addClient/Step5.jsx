import Image from "next/image";
import React, { useState } from "react";

const AddClientStep5 = ({ clientData, setIsAddClientModalOpen }) => {
  const { clientId, name } = clientData;
  return (
    <div className='bg-white p-[2rem] flex flex-col justify-between items-center rounded-b-2xl gap-12  max-h-[535px] overflow-scroll scrollbar-hide'>
      <div className='flex flex-col justify-between items-center gap-4 px-[2rem]'>
        <Image
          src={"/green-tick.svg"}
          alt='green-tick'
          width={150}
          height={100}
          className='aspect-square'
        />

        <p className='text-[#036231] bold text-[1.5rem]'>
          Client Added Successfully
        </p>
        <p className='opacity-35 text-center'>
          Your Client has been notified via Email and SMS with Client ID #
          {clientId ?? "N/A"}
        </p>
        <p className='text-center mt-10'>
          Your Next Follow-up with {name ?? "N/A"} is scheduled after 7 Days
        </p>
      </div>

      <button
        onClick={() => setIsAddClientModalOpen(false)}
        className='bg-[#036231] w-full text-white py-2 px-6 rounded-md mt-10'
      >
        View
      </button>
    </div>
  );
};

export default AddClientStep5;
