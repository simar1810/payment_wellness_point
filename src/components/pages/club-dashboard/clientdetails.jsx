import apiInstance from "@/helpers/api";
import SingleClientinfo from "./singleclientinfo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/loader/Loader";
import { useSelector } from "react-redux";
import { FreeTrialUsers } from "@/app/(club)/free-trial-users/page";
import Link from "next/link";

export default function Clientdetails({ mutateDep, setMutateDep, showEntries, showFreeTrial, searchInput = "" }) {
  const pathName = usePathname();
  const [loading, setLoading] = useState(false);
  const [clientDetails, setClientDetails] = useState([]);
  const clubSystem = useSelector((state) => state.user.clubSystem);

  async function Fetchdata() {
    try {
      setLoading(true);
      const { data, status } = await apiInstance.getAllClients(searchInput);
      if (status === 200) {
        const sortedItems = data?.data?.map(a => ({ ...a, sortedRollno: Number(a.rollno.slice(data.rollNolength)) })).sort((a, b) => a.sortedRollno - b.sortedRollno);
        setClientDetails(sortedItems);
      }
    } catch (error) {
      console.error("fetch All Dashboard error => ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    Fetchdata();
  }, [searchInput, mutateDep]);

  if (loading) return <div className="w-full flex items-center justify-center">
    <Loader />
  </div>

  return <>
    <div className="w-[350%] md:w-[250%] xl:w-full mt-4 px-3 text-sm font-bold flex justify-around gap-1">
      <p className="w-[5%] flex justify-center">Sr.no</p>
      <p className="w-[12%] flex justify-center">Customer Name</p>
      <p className="w-[10%] flex justify-center">Roll No</p>
      <p className="w-[12%] flex justify-center">Sponsored By</p>
      <p className="w-[12%] flex justify-center">Phone Number</p>

      {clubSystem === 2 && <>
        <p className="w-[10%] flex justify-center">Volume Points</p>
        <p className="w-[12%] flex justify-center">Days Remaining</p>
      </>}
      <p className="w-[10%] flex justify-center">Attendance</p>
      <p className="w-[12%] flex justify-center">Status</p>
      <p className="w-[5%] flex justify-center">Actions</p>
    </div>

    <div className="w-[350%] md:w-[250%] xl:w-full h-[1.2px] bg-[#EEEEEE] my-2"></div>

    <div className="w-[350%] md:w-[250%] xl:w-full flex flex-col justify-around gap-1">
      {(
        <div>
          {clientDetails?.map((client, index) => showEntries === undefined || !showEntries
            ? <SingleClientinfo
              key={index}
              index={index}
              detail={client}
              onMutateDep={setMutateDep} />
            : showEntries > index
              ? <SingleClientinfo
                key={index}
                index={index}
                detail={client}
                onMutateDep={setMutateDep}
              />
              : <></>
          )}
          {pathName.includes("club-clients")
            ? <></>
            : <div className="w-[30%] sm:w-full flex items-center justify-center mt-8">
              <Link
                href="/club-clients"
                className="px-3 py-[6px] border-[2px] border-solid border-[#036231] text-[#036231] font-medium rounded-lg"
              >
                View all Records
              </Link>
            </div>}
        </div>
      )}
      {showFreeTrial && <FreeTrialUsers
        searchInput={searchInput}
        startidx={clientDetails.length} />}
    </div>
  </>
}