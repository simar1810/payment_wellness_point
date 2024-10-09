import React, { useState } from "react";
import { LinkIcon, CopyToClickIcon, Backicon } from "@/components/svgs";
import apiInstance from "@/helpers/api";
import toast from "react-hot-toast";
import { LINK_GENERATOR_CLIENT_NAME } from "@/helpers/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { setIsCopyToClipBoard } from "@/redux/slices/userSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Spinner from "@/components/loader/Spinner";
import Loader from "@/components/loader/Loader";

function LinkPage({
  currentPage,
  setCurrentPage,
  baseLink,
  setBaseLink,
  generatedLink,
  setGeneratedLink,
}) {
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isCopyToClipBoard } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log(isCopyToClipBoard);
  const router = useRouter();

  async function instantMeeting() {
    setLoading(true);

    try {
      if (!baseLink || baseLink.length === 0) {
        toast.error("Please enter a link");
        setLoading(false);
        return;
      }

      if (
        !(baseLink.startsWith("http://") || baseLink.startsWith("https://"))
      ) {
        toast.error("Link should start with http:// or https://");
        setLoading(false);
        return;
      }

      const today = new Date();
      const hrs = today.getHours(); // => 9
      const min = today.getMinutes(); // =>  30
      const sec = today.getSeconds();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();
      const currentDateAndTime =
        dd + "-" + mm + "-" + yyyy + " " + hrs + ":" + min + ":" + sec;
      const payload = {
        baseLink: baseLink,
        schedulueDate: currentDateAndTime,
        linkGeneratorClientName: LINK_GENERATOR_CLIENT_NAME,
        meetingType: "quick",
      };

      let response;
      if (currentPage === "quickMeetingStep1") {
        response = await apiInstance.generateLink(payload);
        if (response.status) {
          setGeneratedLink(response.data.data.wellnessZLink);
          setBaseLink("");
          toast.success("Link Generated");
          if (isCopyToClipBoard) {
            navigator.clipboard.writeText(response.data.data.wellnessZLink);
            toast("Link Copied to Clipboard!");
          }
        }
        setLoading(false);
        return;
      }
      if (currentPage === "scheduleMeetingStep1") {
        setCurrentPage("scheduleMeetingStep2");
      } else if (currentPage === "reccuringMeetingStep1") {
        setCurrentPage("reccuringMeetingStep2");
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
      setLoading(false);
      console.error("instantMeeting error => ", error);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <button
        className=" bg-[#036231] text-white flex items-center justify-center gap-2 px-3 py-1 rounded-md self-start ml-4 mt-4"
        // onClick={() => router.back()}
        onClick={() => setCurrentPage("MeetingOptions")}
      >
        <Backicon h={15} w={15} c={"white"} />
        Back
      </button>

      <p className=" text-[#036231] w-[90%] text-[30px] sm:text-[40px] font-extrabold drop-shadow-lg mt-10 text-center">
        TWP <span className=" text-black"> Link Generator </span>
      </p>

      <p className="text-center font-medium w-[90%]">
        Say goodbye to long, complicated links and Say hello to custom WellnessZ
        integerated meeting links
      </p>

      <div className="w-[90%] flex items-center justify-center rounded-xl gap-2 mt-14">
        <LinkIcon h={25} w={25} c={"black"} />

        <div className="w-[90%] sm:w-[60%] h-[40px] border-[#00000040] border-[1px] border-solid flex items-center rounded-md pl-1 ">
          <p className=" text-[#666666] font-medium w-[30px]">link</p>

          <input
            type="text"
            className="w-[calc(100%-130px)] outline-none px-1"
            placeholder="Type or Paste your link here"
            // value={generatedLink && generatedLink.length > 0 ? "" : baseLink}
            value={baseLink}
            onChange={(e) => setBaseLink(e.target.value)}
          />

          <button
            onClick={instantMeeting}
            className=" h-full w-[100px] bg-[#036231] text-white rounded-md"
          >
            {loading ? <Spinner color="white" /> : "Convert"}
          </button>
        </div>
      </div>

      <div className=" flex items-center gap-2 mt-6">
        <div
          onClick={() => {
            setToggle((prev) => {
              const newValue = !prev;
              dispatch(setIsCopyToClipBoard(newValue));
              Cookies.set("copyToClipBoard", newValue);
              return !prev;
            });
          }}
          className={`h-[25px] w-[50px] bg-[#00000040] rounded-full px-[2px] cursor-pointer  flex items-center`}
        >
          <div
            className={`h-[20px] rounded-full w-[20px] ${isCopyToClipBoard ? "bg-[#036231]" : "bg-gray-500"
              } transition-all duration-150 ${isCopyToClipBoard ? " translate-x-[26px]" : ""
              }  `}
          ></div>
        </div>
        <p className=" text-[#000000] font-light text-[15px]">
          Auto Paste to clipboard
        </p>
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-10">
        <p className="w-[90%] sm:w-[60%] font-semibold text-left">WellnessZ Meet Link</p>

        <div className="flex items-center h-[45px] w-[90%] sm:w-[60%] rounded-lg overflow-hidden border-[1px] border-solid border-[#00000040] ">
          <input
            type="text"
            className=" w-[80%] h-full outline-none px-1 font-light placeholder:font-light"
            placeholder="https://usc.wellnessz.meet/zoom"
            value={generatedLink}
            onChange={(e) => setGeneratedLink(e.target.value)}
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(generatedLink);
              toast("Link Copied to Clipboard!");
            }}
            className=" w-[20%] h-full bg-[#E8B903] text-white rounded-lg flex items-center justify-center gap-2"
          >
            <CopyToClickIcon h={20} w={20} /> Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default LinkPage;
