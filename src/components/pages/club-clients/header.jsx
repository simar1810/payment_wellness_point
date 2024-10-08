import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { debounce, set } from "lodash";
import { Downarrowicon, Searchicon, Shareicon } from "@/components/svgs";
import useOutsideClick from "@/hooks/useOutsideClick";
import { SITE_URL } from "@/helpers/apiConfig";
import { useSelector } from "react-redux";
import { FaFileExcel } from "react-icons/fa";
import apiInstance from "@/helpers/api";

function Header({ setSearchInput, refreshClientsData }) {
  const [isDropDown, setIsDropDown] = useState(false);
  const [searchInput, setSearchInputLocal] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const router = useRouter();
  const dropdownRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const excelFileRef = useRef(null);
  const [excelFile, setExcelFile] = useState(null)
  // console.log("user from user slice => ", user);

  useOutsideClick(dropdownRef, () => {
    setIsDropDown(false);
  });

  function handleOnBoardingForm() {
    const link = `${SITE_URL}/onBoardingForm?id=${user?._id ?? ""}`;
    navigator.clipboard.writeText(link);
    toast("Form link copied to clipboard!");
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
  }, [debouncedValue]);

  async function exportAllClientData() {
    try {
      const response = await apiInstance.exportAllClientinExcel()

      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'customers.csv');
      document.body.appendChild(link);

      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleExcelFileChange = (e) => setExcelFile(e.target.files[0])

  async function importClientData() {
    try {
      if (!excelFile) return;

      const formData = new FormData();
      formData.append('excelFile', excelFile);

      const response = await apiInstance.importAllClientinExcel(formData)
      if (response.data.success) {
        toast.success(response.data.message)
        refreshClientsData()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="h-[50px] w-full flex flex-col md:flex-row items-center justify-between pr-3 ">
      <div className="flex self-start md:self-center">
        <p className="text-xl font-medium">Customers</p>
      </div>
      <div className="flex gap-2">
        <div className="w-[65%] h-[35px] rounded-md border-[1.4px] border-solid border-[#00000060] flex items-center gap-1 px-[3px] md:w-[200px]">
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
            onClick={() => setIsDropDown((prev) => !prev)}
            className="px-4 py-1 h-[35px] md:w-[180px] text-white text-[14px] font-semibold bg-[#036231] flex items-center justify-center gap-3 rounded-md w-[115%] text-xs"
          >
            Add New Customer
            <span
              className={`mt-1 transition-all duration-200 ${isDropDown ? " rotate-180" : " rotate-0"
                }`}
            >
              <Downarrowicon h={15} w={15} c={"white"} />
            </span>
          </button>
          <div
            className={`w-[115%] text-xs md:w-[180px] bg-[#DDF9B9] absolute mt-1 rounded-md flex items-center flex-col gap-2 transition-all duration-200 overflow-hidden ${isDropDown ? "h-[90px] p-1" : "h-[0px] p-0"
              }`}
          >
            <div
              onClick={() => router.push("/club-clients/addclient")}
              className="px-4 py-1 h-[35px] w-full cursor-pointer text-white text-[14px] font-semibold bg-[#036231] flex items-center justify-center gap-2 rounded-md"
            >
              Add Customer <span className="text-lg">+</span>
            </div>
            <div
              onClick={handleOnBoardingForm}
              className="px-3 py-1 h-[35px] cursor-pointer w-full text-white text-[14px] font-semibold bg-[#036231] flex items-center justify-center gap-2 rounded-md"
            >
              Onboarding Form{" "}
              <span className="text-lg -rotate-15">
                <Shareicon h={15} w={15} c={"white"} />
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={exportAllClientData}
          className="px-4 py-1 h-[35px] text-white text-[14px] font-semibold bg-[#036231] flex items-center justify-center gap-3 rounded-md text-xs">
          <FaFileExcel />
          Export
        </button>
        <div className="relative">
          <input
            name="excel-file"
            type="file"
            ref={excelFileRef}
            onChange={handleExcelFileChange}
            className="hidden"
            accept=".xlsx, .xls, .csv"
          />
          {/* <button
            onClick={() => {
              excelFile ? importClientData() : excelFileRef?.current?.click()
            }}
            className="px-4 py-1 h-[35px] text-white text-[14px] font-semibold bg-[#036231] flex items-center justify-center gap-3 rounded-md text-xs relative">
            <FaFileExcel />
            {excelFile ? <>Upload</> : <>Import</>}
          </button>
          {excelFile && <div className="font-bold text-[14px] text-black absolute top-[-8px] left-1/2 translate-y-[-100%] translate-x-[-50%] whitespace-nowrap">
            <span>{excelFile.name}</span>
            <button className="bg-black text-white text-[10px] ml-2 px-2 py-1 aspect-square rounded-full " onClick={() => {
              excelFileRef.current.value = excelFileRef.current.defaultValue
              setExcelFile(null)
            }}>X</button>
          </div>
          } */}
        </div>
        {/* <a
          href="/Demo.csv"
          onClick={exportAllClientData}
          className="px-4 py-1 h-[35px] text-white text-[14px] font-semibold bg-[#036231] flex items-center justify-center gap-3 rounded-md text-xs">
          <FaFileExcel />
          Demo
        </a> */}
      </div>
    </div >
  );
}

export default Header;
