"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invoice = searchParams.get("invoice");

  if (!invoice) {
    router.push("/retail/orders");
    return null;
  }

  return (
    <div className='flex justify-center items-center h-screen px-10'>
      <div className='px-10 py-6  w-full min-h-[400px] max-w-[600px] bg-white rounded-2xl shadow-md flex flex-col items-center justify-center '>
        <h1 className='text-2xl font-bold text-center'>
          Order Edited Successfully
        </h1>
        <Image
          src='/Confirmed-cuate.png'
          alt='success'
          width={250}
          height={250}
        />
        <p className='text-center text-gray-500 mt-2'>
          Order ID {invoice || ""}
        </p>
        <div className='flex justify-center items-center mt-4'>
          <Link
            className='bg-[#036231] text-white px-4 py-2 rounded-md'
            href={"/retail/orders"}
          >
            Order Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
