"use client";

import OrdersSummary from "@/components/pages/retail/header";
import apiInstance from "@/helpers/api";
import { setBrands } from "@/redux/slices/brandSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function Page() {
  const dispatch = useDispatch();
  const Data = useSelector((state) => state.brand);
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchOrders() {
    try {
      setLoading(true);
      const { data, status } = await apiInstance.getOrdersHistory();
      console.log("Orders Data ==> ", data.data);
      if (status === 200) {
        setOrdersData(data.data?.myOrder);
      }
    } catch (error) {
      console.log("Error fetching orders data ==> ", error);
    } finally {
      setLoading(false);
    }
  }
  async function fetchBrands() {
    try {
      const { data, status } = await apiInstance.getRevenueData();
      if (status === 200) {
        dispatch(setBrands(data.data.brands));
        console.log("Brands Data ==> ", data.data);
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Error fetching revenue data");
    }
  }

  useEffect(() => {
    fetchBrands();
    fetchOrders();
  }, []);

  return (
    <section className=" p-4 md:px-14 md:py-10 mt-4">
      <OrdersSummary orders={ordersData} />
      <section className="mt-10">
        <div className="bg-white p-6 rounded-md">
          <h1 className="text-3xl font-semibold">Top Brands</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-5">
            {Data?.brands?.map((item, index) => (
              <Link
                key={index}
                href={{
                  pathname: "/retail/brand/margins",
                  query: { id: item._id },
                }}
              >
                <div
                  key={item._id}
                  className="p-2 rounded-md shadow-md flex flex-col"
                >
                  <Image
                    src={item?.image}
                    width={250}
                    height={250}
                    alt="Product Image"
                    className="h-28 lg:h-48 mt-1 object-cover"
                  />
                </div>
                <p className="text-center mt-3">{item?.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

export default Page;
