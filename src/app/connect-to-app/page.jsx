"use client";

import Footer from "@/components/core/Footer";
import ConnectToApp from "@/components/pages/connect-to-app";
import { CrossIcon } from "@/components/svgs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  return (
    <>
      <nav className='bg-white mt-6 '>
        <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
          <div className='relative flex items-center justify-between h-16'>
            <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start border-b-2 pb-3 border-b-gray-400'>
              <Link href="https://wellnessz.in/" target="_blank" className='flex-shrink-0 flex items-center'>
                <Image
                  alt='WellnessZ Logo'
                  height={100}
                  src='/wc-logo-black.svg'
                  width={100}
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className='w-full min-h-[100vh] h-fit my-4 flex items-center justify-center relative'>
        <h1 className='text-[600px] text-gray-300 tracking-wide absolute z-0'>
          WZ
        </h1>
        <div className=' bg-white p-6 px-10 rounded-xl shadow-2xl mb-10 flex flex-col z-10 w-full max-w-3xl '>
          <button
            className='self-end mb-2z'
            onClick={() => router.push("/club-dashboard")}
          >
            <CrossIcon w={30} h={30} />
          </button>
          <ConnectToApp />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page;
