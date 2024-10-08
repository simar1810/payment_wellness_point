import { Completeordericon } from "@/components/svgs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loader from "@/components/loader/Loader";
import apiInstance from "@/helpers/api";
import toast from "react-hot-toast";

export default function Retailspage({ clientId }) {
  const [loading, setLoading] = useState(false);

  const [retails, setRetails] = useState([]);

  useEffect(() => {
    const fetchClientRetails = async () => {
      setLoading(true);
      // await new Promise((r) => setTimeout(r, 5000));
      try {
        const { data, status } = await apiInstance.getClientOrdersHistory(
          clientId
        );

        if (status === 200) {
          console.log("response of fetch ClientRetails => ", data);
          const staticResponse = {
            status_code: 200,
            data: {
              myOrder: [
                {
                  brand: {
                    _id: "65c9b87727653f65c27ba58e",
                    margins: [0, 15, 25, 35, 42, 50],
                  },
                  _id: "660ffb07da3531415fa05d02",
                  orderId: 5939133286,
                  coachId: "660ffa8ada3531415fa05cb7",
                  clientId: "660ffae9da3531415fa05cd8",
                  clientName: "gg",
                  invoiceNumber: "c13826ee-3a88-4c3a-b927-5e72bf80d429",
                  productModule: [
                    {
                      _id: "65f487c755c5386df4aa2716",
                      productName: "Farmula 1 - Chocolate",
                      productImage:
                        "https://wellnessz-bucket.s3.ap-south-1.amazonaws.com/Like+%26+Follow(1)/1.png",
                      productDescription: "Nutrition Mix",
                      productId: "6fa8dddf-c71e-4390-91b7-cead2f045f5d",
                      quantity: 1,
                      brandId: "65c9b87727653f65c27ba58e",
                      productMrpList: {
                        0: 2378,
                        15: 2065,
                        25: 1857,
                        35: 1649,
                        42: 1503,
                        50: 1337,
                      },
                      // price: 23,
                      __v: 0,
                    },
                    {
                      _id: "65f487c755c5386df4aa2736",
                      productName: "Farmula 2",
                      productImage:
                        "https://wellnessz-bucket.s3.ap-south-1.amazonaws.com/Like+%26+Follow(1)/1.png",
                      productDescription: "Nutrition Mix 2",
                      productId: "6fa8dddf-c71e-4390-91b7-cead2f045f5d",
                      quantity: 1,
                      brandId: "65c9b87727653f65c27ba58e",
                      productMrpList: {
                        0: 2378,
                        15: 2065,
                        25: 1857,
                        35: 1649,
                        42: 1503,
                        50: 1337,
                      },
                      // price: 23,
                      __v: 0,
                    },
                  ],
                  status: "Completed",
                  profit: 313,
                  costPrice: 2065,
                  coachMargin: 15,
                  customerMargin: 0,
                  sellingPrice: 2378,
                  createdAt: "05-04-2024 13:22:15",
                  __v: 0,
                },
              ],
              retailRequest: [],
            },
            message: "Order history fetched successfully",
          };

          const tempOrdersData = (data?.data?.myOrder || []).map((order) => {
            let newOrder = {};
            const productModule =
              order?.productModule && order.productModule.length > 0
                ? order.productModule
                : [{}];

            const title = productModule.map(
              (product) => product?.productName || ""
            );
            // const sellingPrice = productModule.reduce((acc, product) => acc + product?.price || 0, 0)

            newOrder["status"] = order?.status ?? "";
            newOrder["sellingPrice"] = order?.sellingPrice ?? "";
            // newOrder["sellingPrice"] = sellingPrice ?? "";
            newOrder["title"] = title.slice(0, 3).join(", ");
            newOrder["productImage"] = productModule[0]?.productImage ?? "";
            newOrder["createdAt"] = order?.createdAt
              ? order.createdAt.slice(0, 10)
              : "";

            return newOrder;
          });
          setRetails(tempOrdersData ?? []);
        }
      } catch (err) {
        console.log("err in fetch ClientRetails api => ", err);
        toast.error("Error while fetching Retails of client !");
      }
      setLoading(false);
    };
    fetchClientRetails();
  }, [clientId]);

  if (loading) {
    return <Loader />;
  }

  if (!retails || retails.length === 0) {
    return (
      <div className="flex justify-center items-center mt-6 min-h-[300px]">
        No Orders Yet
      </div>
    );
  }
  return (
    <div className=" h-full flex flex-col items-center  w-full relative p-5">
      <div className=" flex gap-2 w-full">
        {retails.map((retail, idx) => (
          <Retail key={idx} retail={retail} />
        ))}
      </div>
      <button className=" bg-[#036231] px-5 py-[6px] rounded-md font-medium text-white  mt-4  ">
        + New Order
      </button>
    </div>
  );
}

function Retail({ retail }) {
  const { status, sellingPrice, title, productImage, createdAt } = retail || {};

  return (
    <div className=" w-full bg-[#F5F5F5] p-3 flex gap-3 rounded-md">
      <Image
        src={productImage ?? ""}
        alt="productImg"
        height={0}
        width={0}
        unoptimized
        className=" h-[160px] w-[160px] rounded-md"
      />
      <div className=" w-[calc(100%-160px)] h-full flex items-center justify-between">
        <div className=" h-full flex  justify-between flex-col">
          <div className=" flex gap-1 items-center">
            <Completeordericon h={35} w={35} />
            <div>
              <p className=" text-sm text-[#03632C] font-semibold">
                {status ?? ""}
              </p>
              <p className=" text-sm text-[#A1A1A1]">{createdAt ?? ""}</p>
            </div>
          </div>
          <div>
            <p className=" text-[20px] font-semibold">{title ?? ""}</p>
            {/* <p className=" text-[13px] ">
              Milk Based Protein Blend, Herbalife shakemate protein{" "}
            </p> */}
          </div>
          <div>
            <p className=" text-[#036231] underline underline-offset-1 cursor-pointer">
              Order Details &gt;
            </p>
          </div>
        </div>
        <div>
          <p className=" text-[20px] font-medium mt-2">
            ₹ {sellingPrice ?? ""}
          </p>
        </div>
      </div>
    </div>
  );
}
