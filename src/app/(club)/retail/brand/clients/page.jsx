"use client";

import Clients from "@/components/pages/recipes/clients";
import apiInstance from "@/helpers/api";
import { setCheckout } from "@/redux/slices/checkoutSlice";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const ClientsPage = () => {
  const [Data, setData] = useState([]);
  const [clientId, setClientId] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const brandId = searchParams.get("brandId");
  const margin = searchParams.get("margin");

  console.log("clients ===>", Data);

  useEffect(() => {
    async function fetchClients() {
      try {
        setLoading(true);
        const { data, status } = await apiInstance.getClients();
        if (status === 200) {
          setData(data.data);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error("Error fetching clients");
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  return (
    <section className='h-full w-full bg-[#f4f4f4] p-3'>
      <div className='ml-3'>
        <div className='flex gap-2'>
          <div className='h-[20px] w-[3px] bg-[#036231]'></div>
          <p className='font-semibold text-sm'>All Clients</p>
        </div>
        <p className='text-[14px] font-sm text-[#5d5d5d] font-medium'>
          {Data.length} Members
        </p>
      </div>
      {loading ? (
        <div className='flex-col gap-4 w-full flex items-center justify-center py-[3px] min-h-52'>
          <div className='w-10 h-10 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full'></div>
        </div>
      ) : Data?.length > 0 ? (
        <div className='w-full grid grid-cols-2 gap-x-24 gap-y-4 mt-6 ml-3'>
          {Data.map(
            (data, index) =>
              data && (
                <Clients
                  key={index}
                  data={data}
                  clientId={clientId}
                  setClientId={setClientId}
                />
              )
          )}
        </div>
      ) : (
        <div className='flex justify-center items-center h-[50vh]'>
          <p className='text-gray-500 text-lg'>No Clients Found</p>
        </div>
      )}
      {clientId && (
        <div className='h-20 w-full flex justify-center items-center'>
          <Link
            href={{
              pathname: "/retail/brand/products",
              query: { brandId, margin, clientId },
            }}
            onClick={() => {
              const client = Data.find((client) => client?._id === clientId);
              console.log("client ==!!>", client);
              dispatch(
                setCheckout({
                  client: client,
                })
              );
            }}
            className='bg-[#036231] text-white rounded-md px-6 py-2 mt-10 self-end'
          >
            Continue
          </Link>
        </div>
      )}
    </section>
  );
};

export default ClientsPage;
