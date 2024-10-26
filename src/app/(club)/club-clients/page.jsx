"use client";

import React, { useState } from "react";
import { Header } from "@/components/pages/club-clients";
import { Clientdetails } from "@/components/pages/club-dashboard";
import { Backicon } from "@/components/svgs";
import { useRouter } from "next/navigation";

function Page() {
  const [mutateDep, setMutateDep] = useState(false);
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="w-full overflow-scroll p-2 scrollbar-hide">
      <div className="bg-white rounded-2xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] pt-4">
        <button
          className=" bg-[#036231] text-white flex items-center gap-2 px-3 py-1 rounded-md ml-4"
          onClick={() => router.back()}
        >
          <Backicon h={15} w={15} c={"white"} />
          Back
        </button>
        <div className="p-5">
          <Header setSearchInput={setSearchInput} refreshClientsData={() => setMutateDep(prev => !prev)} />
        </div>
        <div className="-mt-5 p-3 overflow-scroll scrollbar-hide">
          <Clientdetails
            mutateDep={mutateDep}
            setMutateDep={setMutateDep}
            showFreeTrial={true}
            searchInput={searchInput} />
        </div>
      </div>
    </div>
  );
}

export default Page;