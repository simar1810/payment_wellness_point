"use client";
import { Backicon } from "@/components/svgs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Page = () => {
  const orderDetails = useSelector((state) => state.user.orderDetails);
  // console.log("orderDetails", orderDetails);
  const router = useRouter();

  return (
    <div className="flex justify-center items-center px-10 py-4">
      <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md">
        <button
          className=" bg-[#036231] text-white flex items-center gap-2 px-3 py-1 rounded-md mb-2"
          onClick={() => router.back()}
        >
          <Backicon h={15} w={15} c={"white"} />
          Back
        </button>

        <div className="flex flex-col sm:flex-row gap-2 justify-between">
          <div className="w-full max-w-[600px]">
            <div className="mb-4 w-full">
              <h1 className="text-xl font-bold  mt-6">Item Details</h1>
            </div>
            {orderDetails?.productModule?.map((product) => (
              <div
                key={product._id}
                className="flex items-start mb-4 border-b pb-4"
              >
                <Image
                  src={product?.productImage}
                  alt={product?.productName}
                  width={64}
                  height={64}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="ml-6 w-[50%]">
                  <h3 className="font-semibold mb-1">{product?.productName}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 max-w-[400px]">
                    {product?.productDescription}
                  </p>
                  <div className="mt-2 font-semibold text-sm">
                    Qty: {product?.quantity}
                  </div>
                </div>
                <h1 className="font-semibold text-lg ml-auto">
                  ₹ {product?.price}
                </h1>
              </div>
            ))}
          </div>

          <div className="w-full sm:w-[40%] p-6 border rounded-xl min-h-[400px] flex flex-col gap-4">
            <div className="mb-2">
              <h1 className="text-xl font-semibold">Order Summary</h1>
            </div>

            <div className="flex justify-between">
              <p className="font-medium text-[17px]">Order ID</p>
              <p className="text-gray-500">{orderDetails?.orderId}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-medium text-[17px]">Order Date</p>
              <p className="text-gray-500">{orderDetails?.date}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-medium text-[17px]">Order Total</p>
              <p className="text-gray-500">₹ {orderDetails?.orderValue}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-medium text-[17px]">Points Earned</p>
              <p className="text-gray-500">
                {orderDetails?.pointsEarned.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
