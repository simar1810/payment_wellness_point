import {
  CrossIcon,
  Downarrowicon,
  Searchicon,
  Shareicon,
} from "@/components/svgs";
import { SITE_URL } from "@/helpers/apiConfig";
import useOutsideClick from "@/hooks/useOutsideClick";
import Cookies from "js-cookie";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function Header({ toggle, setToggle, setSearchInput }) {
  const router = useRouter();
  const [searchInput, setSearchInputLocal] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [isDropDown, setIsDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useSelector((state) => state.user);

  useOutsideClick(dropdownRef, () => {
    setIsDropDown(false);
  });

  function SetToggle(prop) {
    setToggle(() => {
      const newvalue = {
        meeting: "meeting" === prop,
        client: "client" === prop,
      };
      return newvalue;
    });
  }

  const debouncedSearch = useCallback(
    debounce((value) => {
      setDebouncedValue(value);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchInput);
  }, [searchInput, debouncedSearch]);

  useEffect(() => {
    setSearchInput(debouncedValue);
  }, [debouncedValue, setSearchInput]);

  useEffect(() => {
    if (searchInput !== "") {
      SetToggle("client");
    }
  }, [searchInput]);

  function handleOnBoardingForm() {
    const link = `${SITE_URL}/onBoardingForm?id=${user?._id ?? ""}`;
    navigator.clipboard.writeText(link);
    toast("Form link copied to clipboard!");
  }

  return (
    <div className="h-[50px] w-full border-b-[2px] border-solid border-[#036231] flex flex-col sm:flex-row items-end justify-between pr-3 mb-5">
      <div className="flex w-full sm:w-fit justify-between">
        <p
          onClick={() => {
            SetToggle("meeting");
            setSearchInputLocal("");
            setSearchInput("");
          }}
          className={`text-[#00000060] cursor-pointer font-semibold h-[48px] w-[50%] sm:w-[140px] flex items-center justify-center ${toggle.meeting ? "bg-[#036231] rounded-t-md text-white" : ""
            }`}
        >
          Meeting Details
        </p>

        <p
          onClick={() => SetToggle("client")}
          className={`text-[#00000060] cursor-pointer font-semibold h-[48px] w-[50%] sm:w-[140px] flex items-center justify-center ${toggle.client ? "bg-[#036231] rounded-t-md text-white" : ""
            }`}
        >
          Total Customer
        </p>
      </div>

      <div className="w-full sm:w-fit flex flex-col sm:flex-row gap-2 mt-2 mb-2 items-end sm:justify-end">
        <div className="w-[95%] sm:w-[45%] h-[35px] rounded-md border-[1.4px] border-solid border-[#00000060] flex  items-center gap-1 px-[3px]">
          <Searchicon h={15} w={15} c={"#B5B7C0"} />
          <input
            type="search"
            className="w-full outline-none border-none text-sm font-normal"
            placeholder="Search Customer"
            value={searchInput}
            onChange={(e) => setSearchInputLocal(e.target.value)}
          />
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              setIsDropDown((prev) => !prev);
              SetToggle("client");
            }}
            className=" px-4 py-1 w-[200px] h-[35px] text-white text-[14px] font-semibold bg-[#036231] flex items-center justify-center gap-3 rounded-md"
          >
            Add New Customer{" "}
            <span
              className={`mt-1 transition-all duration-200 ${isDropDown ? " rotate-180" : " rotate-0"
                }`}
            >
              <Downarrowicon h={15} w={15} c={"white"} />
            </span>
          </button>

          <div
            className={` w-[180px]  bg-[#DDF9B9] absolute  mt-1  rounded-md flex items-center flex-col gap-2 transition-all duration-200 overflow-hidden ${isDropDown ? "h-[90px] p-1" : "h-[0px] p-0"
              }   `}
          >
            <div
              onClick={() => router.push("/club-clients/addclient")}
              className=" px-4 py-1 h-[35px] w-full cursor-pointer text-white text-[14px] font-semibold bg-[#036231] flex items-center justify-center gap-2 rounded-md"
            >
              Add Customer <span className=" text-lg">+</span>
            </div>

            <div
              onClick={handleOnBoardingForm}
              className=" px-3 py-1 h-[35px] cursor-pointer w-full text-white text-[14px] font-semibold bg-[#036231] flex items-center justify-center gap-2 rounded-md"
            >
              Onboarding Form{" "}
              <span className=" text-lg -rotate-15">
                <Shareicon h={15} w={15} c={"white"} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
