"use client";

import Tour from "@/components/core/Tour/Tour";
import {
  Activeprogram,
  Dailygoals,
  FunnelInsights,
  Nextfollowups,
  Statistics,
  Topperfomers,
} from "@/components/pages/dashboard";
import Notes from "@/components/pages/dashboard/notes";
import Reminders from "@/components/pages/dashboard/reminders";
import apiInstance from "@/helpers/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const steps = [
  {
    target: ".total-clients",
    content: "Total no.of clients",
    disableBeacon: true,
  },
  {
    target: ".active-members",
    content: "Total no.of active members",
  },
  {
    target: ".meals-created",
    content: "Total no.of meals created",
  },
  {
    target: ".orders",
    content: "Total no.of orders",
  },
  {
    target: ".monthly-revenue",
    content: "Total monthly revenue",
  },
  {
    target: ".reminders",
    content: "List of Reminders",
  },
  {
    target: ".daily-goals",
    content: "List of Daily Goals",
  },
  {
    target: ".funnels",
    content: "Attaching Funnel Pages to Dashboard",
  },
  {
    target: ".notes",
    content: "List of Notes",
  },
  {
    target: ".top-performers",
    content: "List of Top Performers of this month",
  },
  {
    target: ".upcoming-followups",
    content: "List of Upcoming Followups",
  },
  {
    target: ".active-programs",
    content: "List of Active Programs",
  },
];

function Page() {
  const [data, setData] = useState({});
  const [revenue, setRevenue] = useState({});
  const [reminders, setReminders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchReminders() {
    try {
      setLoading(true);
      const { data, status } = await apiInstance.getReminders();
      console.log("Fetch Reminders data => ", data);
      if (status === 200) {
        if (data.data.constructor.name === "Array") {
          setReminders(data.data);
        }
      }
    } catch (error) {
      console.log("error => ", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchNotes() {
    try {
      setLoading(true);
      const { data, status } = await apiInstance.getNotes();
      console.log("Fetch Notes data => ", data.data);
      if (status === 200) {
        setNotes(data.data);
      }
    } catch (error) {
      console.log("error => ", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchData() {
    try {
      setLoading(true);
      const { data, status } = await apiInstance.getCouchHomeData();
      // console.log("Home", data.data);
      if (status === 200) {
        setData(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error", error);
      toast.error("Error fetching data");
      setLoading(false);
    }
  }

  async function fetchRevenue() {
    try {
      setLoading(true);
      const { data, status } = await apiInstance.getRevenueData();
      // console.log("Revenue", data.data);
      if (status === 200) {
        setRevenue(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error", error);
      // toast.error("Error fetching revenue data");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    fetchRevenue();
    fetchReminders();
    fetchNotes();
  }, []);

  return (
    <section className="w-full bg-[#f4f4f4] p-5">
      <Tour steps={steps} />
      <div className="w-full">
        <Statistics
          data={data}
          revenue={revenue}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
      <section className=" h-[80%] w-full mt-3">
        <div className=" w-full min-h-[50%] grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4 md:gap-2 mt-5">
          {/* BOX1 */}
          <div className=" h-full w-full max-h-[336px] overflow-scroll scrollbar-hide bg-white rounded-lg p-2  shadow-sm">
            <Reminders data={reminders} />
          </div>
          {/* BOX2 */}
          <div className=" h-full w-full bg-white rounded-lg p-2 overflow-hidden shadow-sm">
            <Dailygoals
              data={data}
              loading={loading}
              setLoading={setLoading}
              fetchData={fetchData}
            />
          </div>
          {/* BOX3 */}
          <div className=" h-full w-full bg-white rounded-lg p-2 overflow-hidden shadow-sm">
            <FunnelInsights
              data={data}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
          {/* BOX4 */}
          <div className="h-full w-full bg-white rounded-lg p-2 overflow-hidden shadow-sm">
            <Notes data={notes} />
          </div>
        </div>
        <div className=" w-full min-h-[50%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-2  mt-4 sm:mt-5">
          {/* BOX5 */}
          <div className=" h-full w-full bg-white rounded-lg p-2 shadow-sm">
            <Topperfomers
              data={data}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
          {/* BOX6 */}
          <div className=" h-full w-full bg-white rounded-lg p-2 shadow-sm">
            <Nextfollowups
              data={data}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
          {/*Box7*/}
          <div className=" h-full w-full bg-white rounded-lg p-2 shadow-sm">
            <Activeprogram
              data={data}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </div>
      </section>
    </section>
  );
}

export default Page;
