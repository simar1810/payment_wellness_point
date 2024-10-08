"use client";
import Loader from "@/components/loader/Loader";
import apiInstance from "@/helpers/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Footer from "../../components/core/Footer";

export default function Page({ searchParams }) {
  const { vpId, status = 1, coachId } = searchParams;
  //   console.log('searchParams of vp respons epage => ', searchParams)
  const router = useRouter();

  const [response, setResponse] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiInstance.acceptRejectVP(
          vpId,
          coachId,
          status
        );
        if (response?.status === 200) {
          if (status == 1) {
            setResponse(true);
          } else {
            setResponse(false);
          }
        }
      } catch (error) {
        toast.error("Request already processed");
        router.push("/");
        console.error("error in acceptRejectVP api => ", error);
      }
    })();
  }, [vpId, coachId]);

  if (response === null) {
    return (
      <div className="w-screen h-screen p-5 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div
        className={`w-screen h-screen p-4 flex items-center justify-center ${response
          ? 'bg-[url("/cream-green-bg.png")]'
          : 'bg-[url("/cream-red-bg.png")]'
          } overflow-x-hidden scrollbar-hide`}
      >
        <div
          className={`w-[90%] sm:w-[50%] flex flex-col gap-6 items-center overflow-x-hidden scrollbar-hide`}
        >
          <div className="w-full flex items-center justify-center">
            <Image
              src={response ? "appreciation-bro.svg" : "appreciation-bro-2.svg"}
              width={300}
              height={100}
              alt="illustration"
            />
          </div>

          <p
            className={`text-[2.5rem] text-center ${response ? "text-[#036231]" : "text-[#EA4335]"
              }`}
          >
            {`Request ${response ? "Approved" : "Rejected"} Successfully!`}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
