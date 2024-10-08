"use client";

import OrdersSummary from "@/components/pages/retail/header";
import OrdersTable from "@/components/pages/retail/ordersTable";
import SalesGraph from "@/components/pages/retail/salesChart";
import apiInstance from "@/helpers/api";
import { useEffect, useState } from "react";

function Page() {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

    fetchOrders();
  }, []);

  return (
    <section className="p-4 md:px-14 md:py-10">
      {loading ? (
        <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px] min-h-96">
          <div className="w-10 h-10 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
        </div>
      ) : (
        <>
          <OrdersSummary orders={ordersData} />
          <div className="flex flex-col gap-4">
            {ordersData.length > 0 && <SalesGraph orders={ordersData} />}
            <OrdersTable orders={ordersData} />
          </div>
        </>
      )}
    </section>
  );
}

export default Page;
