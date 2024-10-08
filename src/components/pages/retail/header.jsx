import { Decreaseicon, Increasesvg } from "@/components/svgs";
import Link from "next/link";

const OrdersSummary = ({ orders = [] }) => {
  console.log("Orders Summary ==> ", orders);
  const totalOrders = orders?.length;
  const totalPrice = orders?.reduce(
    (acc, order) => acc + parseInt(order.costPrice),
    0
  );
  const avgOrderValue = totalOrders > 0 ? totalPrice / totalOrders : 0;

  return (
    <div className="flex gap-6 flex-col md:flex-row">
      <div className="bg-[#036231] w-full md:w-80 h-34 rounded-md p-4 text-white shadow-md">
        <p>AVG. Order Value</p>
        <p className="text-2xl  mt-5 font-semibold">
          ₹ {avgOrderValue.toFixed(2)}
        </p>
        <div className="flex items-center gap-4 mt-4">
          <div className="bg-[#03632c] rounded-full flex justify-center items-center gap-2 w-20 p-2">
            <Increasesvg w={15} h={15} c="#ffffff" />
            <p className="text-xs">+ 10%</p>
          </div>
          <p className="text-xs">From last month</p>
        </div>
      </div>
      <div className="bg-white w-full md:w-80 h-34 rounded-md p-4 shadow-md">
        <p>Total Orders</p>
        <p className="text-2xl  mt-5 font-semibold">{totalOrders}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#ff5959] text-white rounded-full flex justify-center items-center gap-2 w-20 p-2">
              <Decreaseicon w={15} h={15} c="#ffffff" />
              <p className="text-xs">-1.5%</p>
            </div>
            <p className="text-xs">From last month</p>
          </div>
          <Link
            href={"/retail/orders"}
            className="text-xs underline font-semibold cursor-pointer"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrdersSummary;
