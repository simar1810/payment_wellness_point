import Image from "next/image";
import { useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Backicon, CrossIcon, EyeIcon } from "@/components/svgs";
import { Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

const OrdersTable = ({ orders }) => {
  const [exportData, setExportData] = useState([]);
  /*   const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]); */
  const router = useRouter();

  /*   const openModal = (products) => {
    setModalData(products);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  }; */

  const exportToExcel = () => {
    const excelData = orders.map((order) => [
      order.orderId,
      order.clientName,
      order.productModule.map((product) => product.productId).join(", "),
      order.createdAt,
      order.sellingPrice,
    ]);

    setExportData(excelData);

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.aoa_to_sheet([
      ["Order ID", "Client Name", "Product Details", "Order Date", "Price"],
      ...excelData,
    ]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const excelFile = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "binary",
    });

    const blob = new Blob([s2ab(excelFile)], {
      type: "application/octet-stream",
    });

    saveAs(blob, "orders.xlsx");
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  return (
    <div className="shadow-md rounded-md overflow-hidden my-10">
      <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b bg-white">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="cursor-pointer">
            <Backicon h={18} w={18} c="#000" />
          </button>
          <h1 className="font-bold text-xl">Latest Orders</h1>
        </div>
        {orders.length > 0 && (
          <button
            onClick={exportToExcel}
            className="  text-[#036231] font-semibold p-1 md:px-2  md:pr-3 md:py-2 text-sm border-2 border-[#036231] hover:bg-[#036231] hover:text-white transition duration-300 ease-in-out rounded-full flex items-center"
          >
            <Image src="/excel.png" width={40} height={40} alt="Excel" />
            Export Report
          </button>
        )}
      </div>

      <div className="bg-white w-full overflow-scroll scrollbar-hide">
        <div className="grid grid-cols-6 px-6 py-4 font-semibold gap-28">
          <div className="">Order ID</div>
          <div className="">Client Name</div>
          <div className="">Product Details</div>
          <div className="">Order Date</div>
          <div className="">Price</div>
          <div className=""></div>
        </div>

        {orders.length === 0 && (
          <div className="px-6 py-2 border-t flex justify-center items-center min-h-80 border-gray-200 ">
            No orders found
          </div>
        )}

        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-6 px-6 py-2 border-t border-gray-200 mb-4 gap-28"
          >
            <div className="">{order.orderId}</div>
            <div className="">{order.clientName}</div>
            <div className="md:line-clamp-2">
              {order.productModule
                .map((product, index) => product.productName)
                .join(", ")}
            </div>
            <div className="">{order.createdAt}</div>
            <div className="">{order.sellingPrice}</div>
            <div className="">
              <Link
                href={{
                  pathname: `/retail/orders/${order._id}`,
                  query: { orderDetails: JSON.stringify(order) },
                }}
                className="cursor-pointer underline underline-offset-2 text-[#036231]"
              >
                Order Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/*   <Modal
        open={modalOpen}
        onClose={closeModal}
        className='flex justify-center items-center'
      >
        <div className='px-6 pb-4 bg-white rounded-md min-h-[300px] max-h-[400px] w-[750px] overflow-scroll scrollbar-hide'>
          <div className='flex items-center justify-between mb-4 sticky top-0 bg-white py-4'>
            <h2 className='text-lg font-semibold'>Product Details</h2>
            <button onClick={closeModal}>
              <CrossIcon w={20} h={20} c={"#000"} />
            </button>
          </div>
          <div>
            <div className='flex font-semibold border-b mb-4 pb-4'>
              <div className='w-1/6'>S.No</div>
              <div className='w-3/6'>Product ID</div>
              <div className='w-1/6'>Product Quantity</div>
              <div className='w-1/6'>Price</div>
            </div>
            {modalData.map((product, index) => (
              <div key={index} className='flex justify-between'>
                <div className='w-1/6'>{index + 1}</div>
                <div className='w-3/6'>{product.productId}</div>
                <div className='w-1/6'>{product.quantity}</div>
                <div className='w-1/6'>{product.price}</div>
              </div>
            ))}
          </div>
        </div>
      </Modal> */}
    </div>
  );
};

export default OrdersTable;
