"use client";

import AddKitModal from "@/components/pages/retail";
import { Editicon } from "@/components/svgs";
import Image from "next/image";
import { useState } from "react";

function Page() {
  const [isAddKitModalOpen, setIsAddKitModalOpen] = useState(false);
  const [Data, setData] = useState([
    {
      id: 1,
      image: "/muscleblaze.png",
      name: "Herbalife Nutrition",
    },
    {
      id: 2,
      image: "/muscleblaze.png",
      name: "Muscleblaze Nutrition",
    },
    {
      id: 3,
      image: "/muscleblaze.png",
      name: "Optimum Nutrition",
    },
    {
      id: 4,
      image: "/muscleblaze.png",
      name: "MuscleTech",
    },
  ]);

  return (
    <section className='px-14 py-10'>
      <div className='bg-white p-6 rounded-md'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-3xl font-semibold'>Kit 1</h1>
          <button
            className='bg-[#036231] text-white rounded-full p-2 px-6 self-end'
            onClick={() => setIsAddKitModalOpen(true)}
          >
            + Add Items
          </button>
        </div>

        <div className='grid grid-cols-5 gap-8 mt-5'>
          {Data.map((item, index) => (
            <div key={index}>
              <div
                key={item.id}
                className='p-2 rounded-md shadow-md flex flex-col'
              >
                <button className='bg-[#036231] text-white rounded-md p-2 self-end'>
                  <Editicon w={10} h={10} />
                </button>
                <Image
                  width={250}
                  height={250}
                  src={item.image}
                  alt='Product Image'
                  className='h-44'
                />
              </div>
              <p className='text-center mt-3'>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {isAddKitModalOpen && (
        <AddKitModal
          setData={setData}
          isAddKitModalOpen={isAddKitModalOpen}
          setIsAddKitModalOpen={setIsAddKitModalOpen}
        />
      )}
    </section>
  );
}

export default Page;
