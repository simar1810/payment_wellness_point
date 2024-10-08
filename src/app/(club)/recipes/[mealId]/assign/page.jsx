"use client";
import RecipeHeader from "@/components/pages/recipes/header";
import apiInstance from "@/helpers/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Clients from "@/components/pages/recipes/clients";

function RecipeAssign({ searchParams }) {
  const planId = searchParams?.planId;
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clientId, setClientId] = useState(null);

  // console.log(planId, clientId);

  useEffect(() => {
    async function fetchClients() {
      try {
        const { data, status } = await apiInstance.getClients();
        // console.log(data);
        if (status === 200) {
          setData(data.data);
        }
      } catch (err) {
        console.log(err);
        toast.error("Error fetching clients");
      }
    }

    fetchClients();
  }, []);

  const assignPlan = async () => {
    if (!clientId) {
      toast.error("Please select a client");
      return;
    }

    try {
      setLoading(true);
      const { status } = await apiInstance.assignMeal({
        planId,
        clientId,
        person: "club-coach",
      });
      if (status === 200) {
        toast.success("Plan assigned successfully to the Client");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Error assigning meal");
      setLoading(false);
    }
  };

  return (
    <section className=" h-full w-full bg-[#f4f4f4] p-3 ">
      <div className=" h-full w-full rounded-lg p-5 overflow-scroll scrollbar-hide">
        <div className=" w-full">
          <RecipeHeader text="Meal Assign" />
        </div>
        <div className="ml-3">
          <div className=" flex gap-2">
            <div className=" h-[20px] w-[3px] bg-[#036231]"></div>
            <p className=" font-semibold text-sm">All Clients</p>
          </div>
          <p className=" text-[14px] font-sm text-[#5d5d5d] font-medium">
            {Data.length} Members
          </p>
        </div>
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-4 mt-6 ml-3">
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
        {Data.length === 0 && (
          <div className=" h-52 w-full flex justify-center items-center">
            <p className=" text-[#5d5d5d] font-medium">No Clients Found</p>
          </div>
        )}
        {Data.length > 0 && (
          <div className=" h-20 w-full flex justify-center items-center">
            <button
              className="bg-[#036231] text-white text-lg rounded-xl px-10 py-2 mt-10"
              onClick={() => assignPlan()}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
              ) : (
                "Assign Plan"
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecipeAssign;
