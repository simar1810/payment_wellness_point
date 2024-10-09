"use client";

import Link from "next/link";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  IoPersonOutline,
  IoCallOutline,
  IoCheckmarkSharp,
} from "react-icons/io5";
import { PiCity } from "react-icons/pi";
import { MdOutlineMailOutline } from "react-icons/md";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import apiInstance from "@/helpers/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Modal } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import usePasswordValidation from "@/hooks/usePasswordValidation";
import Footer from "@/components/core/Footer";

const Page = () => {
  const [registerData, setRegisterData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOtpModelOpen, setIsOtpModelOpen] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const [coachId, setCoachId] = useState("");
  const inputRefs = useRef([]);
  const router = useRouter();

  const { passwordValidation, validatePassword } = usePasswordValidation();

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otp = inputRefs.current.map((input) => input.value).join("");
    try {
      setLoading(true);
      const { data, status } = await apiInstance.verifyRegisterOtp({
        email: registerData.email,
        otp,
      });

      if (status === 200) {
        console.log("data => ", data);
        toast.success("OTP Verified Successfully, redirecting to dashboard...");
        Cookies.set("coachId", coachId);
        Cookies.set("refreshToken", refreshToken);
        router.push("/club-dashboard");
      }
      setLoading(false);
    } catch (error) {
      console.log("error in Verify OTP fn => ", error);
      toast.error(error?.response?.data?.message || "OTP Verification Failed!");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    console.log("registerData => ", registerData);

    e.preventDefault();
    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.mobileNumber
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (
      passwordValidation.length === false ||
      passwordValidation.lowercase === false ||
      passwordValidation.uppercase === false ||
      passwordValidation.specialChar === false
    ) {
      toast.error("Password should match the required criteria");
      return;
    }

    try {
      setLoading(true);
      const { data, status } = await apiInstance.registerCoach(registerData);
      if (status === 200) {
        console.log("data => ", data);
        toast.success("OTP Sent to your Email!");
        setRefreshToken(data?.data?.refreshToken);
        setCoachId(data?.data?.coachId);
        setIsOtpModelOpen(true);
      }
      setLoading(false);
    } catch (error) {
      console.log("error in Register fn => ", error);
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
  };

  return (
    <>
      <div className="md:px-12 px-4 py-12 pb-40 flex-col w-full bg-white text-[whitesmoke]">
        <Link href="https://www.thewellnesspoint.club" target="_blank" className='flex-shrink-0 flex items-center'>
          <Image
            src='/wc-logo-black.svg'
            className='h-28 w-28 rounded-full'
            alt='logo'
            height={100}
            width={100}
          />
        </Link>
        <div className="form rounded-2xl border-dashed border-gray-200 border-2 p-2">
          <div className="bg-[url('/Login-bg.png')] bg-cover bg-center rounded-2xl">
            <div className="md:flex justify-between items-center bg-left py-5 px-4 relative md:w-auto rounded-2xl backdrop-brightness-50">
              <div className="mt-auto md:mb-12 md:ml-20 flex-col items-baseline align-bottom">
                <span className="text-2xl md:text-3xl font-bold tracking-wider">
                  Welcome to
                </span>
                <div className="text-4xl md:text-5xl mt-2 mb-5 md:my-5 text-[#036231] font-extrabold">
                  The Wellness Point CLUB
                </div>
              </div>

              <div className="form flex-col justify-center items-center md:w-2/5">
                <h1 className="shadow-sm text-3xl font-extrabold">
                  Start your Free Trial
                </h1>
                <span className="flex text-sm my-4">
                  Unlock your potential with our exclusive free trial. Sign up
                  today to explore our premium features and see how we can help
                  you achieve your goals. Experience the best without any
                  commitment. Join us now and take the first step towards a better
                  you.
                </span>

                <form onSubmit={handleSubmit}>
                  <div className="bg-[#ECECEC] text-black p-2 rounded-lg flex">
                    <div className="flex items-end pb-1 mr-5 ml-3">
                      <IoPersonOutline size={25} className="text-gray-500" />
                    </div>
                    <div className="overflow-clip px-2">
                      <label htmlFor="name" className="text-xs px-1">
                        Name
                      </label>
                      <br />
                      <input
                        type="text"
                        required
                        className="font-bold bg-[#ECECEC] text-sm p-1 pt-0 outline-none border-b-2"
                        name="name"
                        id="name"
                        placeholder="Please enter Name"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>

                  <div className="bg-[#ECECEC] text-black p-2 rounded-lg flex mt-5">
                    <div className="flex items-end pb-2 mr-5 ml-3">
                      <MdOutlineMailOutline size={25} className="text-gray-500" />
                    </div>
                    <div className="overflow-clip px-2">
                      <label htmlFor="email" className="text-xs px-1">
                        Email
                      </label>
                      <br />
                      <input
                        type="email"
                        required
                        className="font-bold bg-[#ECECEC] text-sm p-1 pt-0 outline-none border-b-2"
                        name="email"
                        id="email"
                        placeholder="Please enter Email"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>

                  <div className="bg-[#ECECEC] text-black p-2 rounded-lg flex mt-5">
                    <div className="flex items-end pb-2 mr-5 ml-3">
                      <RiLockPasswordLine size={25} className="text-gray-500" />
                    </div>
                    <div className="overflow-clip px-2">
                      <label htmlFor="password" className="text-xs px-1">
                        Password
                      </label>
                      <br />
                      <input
                        type="password"
                        required
                        className="font-bold bg-[#ECECEC] text-sm p-1 pt-0 outline-none border-b-2"
                        name="password"
                        id="password"
                        placeholder="Please enter Password"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>

                  {registerData.password && (
                    <div className="mt-3 text-white text-sm flex flex-col gap-1">
                      <div className="flex items-center">
                        <span
                          className={`mr-2 text-black rounded-full flex justify-center items-center w-[15px] h-[15px] ${passwordValidation.length
                            ? "bg-[#036231]"
                            : "bg-red-600"
                            } `}
                        >
                          {passwordValidation.length ? (
                            <IoCheckmarkSharp fontSize={12} />
                          ) : (
                            <RxCross2 fontSize={12} />
                          )}
                        </span>
                        Password should be at least 8 letters
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`mr-2 text-black rounded-full flex justify-center items-center w-[15px] h-[15px] ${passwordValidation.lowercase
                            ? "bg-[#036231]"
                            : "bg-red-600"
                            } `}
                        >
                          {passwordValidation.lowercase ? (
                            <IoCheckmarkSharp fontSize={12} />
                          ) : (
                            <RxCross2 fontSize={12} />
                          )}
                        </span>
                        One lowercase character
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`mr-2 text-black rounded-full flex justify-center items-center w-[15px] h-[15px] ${passwordValidation.uppercase
                            ? "bg-[#036231]"
                            : "bg-red-600"
                            } `}
                        >
                          {passwordValidation.uppercase ? (
                            <IoCheckmarkSharp fontSize={12} />
                          ) : (
                            <RxCross2 fontSize={12} />
                          )}
                        </span>
                        One uppercase character
                      </div>
                      <div className="flex items-cente">
                        <span
                          className={`mr-2 text-black rounded-full flex justify-center items-center w-[15px] h-[15px] ${passwordValidation.specialChar
                            ? "bg-[#036231]"
                            : "bg-red-600"
                            } `}
                        >
                          {passwordValidation.specialChar ? (
                            <IoCheckmarkSharp fontSize={12} />
                          ) : (
                            <RxCross2 fontSize={12} />
                          )}
                        </span>
                        One special character
                      </div>
                    </div>
                  )}

                  <div className="bg-[#ECECEC] text-black p-2 rounded-lg flex mt-5">
                    <div className="flex items-end pb-2 mr-5 ml-3">
                      <IoCallOutline size={25} className="text-gray-500" />
                    </div>
                    <div className="overflow-clip px-2">
                      <label htmlFor="mobileNumber" className="text-xs px-1">
                        Mobile
                      </label>
                      <br />
                      <input
                        type="number"
                        required
                        className="font-bold bg-[#ECECEC] text-sm p-1 pt-0 outline-none border-b-2"
                        name="mobileNumber"
                        id="mobile"
                        placeholder="Please enter Mobile"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>

                  <div className="bg-[#ECECEC] text-black p-2 rounded-lg flex mt-5">
                    <div className="flex items-end pb-2 mr-5 ml-3">
                      <PiCity size={25} className="text-gray-500" />
                    </div>
                    <div className="overflow-clip px-2">
                      <label htmlFor="city" className="text-xs px-1">
                        City
                      </label>
                      <br />
                      <input
                        type="text"
                        required
                        className="font-bold bg-[#ECECEC] text-sm p-1 pt-0 outline-none border-b-2"
                        name="city"
                        id="city"
                        placeholder="Please enter City"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#036231] p-3 mt-8 w-full  rounded-md text-white font-bold"
                  >
                    {loading ? (
                      <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px] ">
                        <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
                      </div>
                    ) : (
                      "Register"
                    )}
                  </button>

                  <div className="flex items-center justify-center mt-5">
                    <span className="flex text-sm">
                      Already have an account?
                      <Link
                        href="/login"
                        className="text-[#7AC143] font-bold ml-2"
                      >
                        Login
                      </Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {isOtpModelOpen && (
            <Modal
              open={isOtpModelOpen}
              onClose={() => setIsOtpModelOpen(false)}
              className="flex items-center justify-center"
            >
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
                <div className="flex space-x-2 justify-center">
                  {Array.from({ length: 4 }, (_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg"
                      ref={(el) => (inputRefs.current[index] = el)}
                      onChange={(e) => handleInputChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleVerify}
                    className="bg-[#7AC143] p-2 px-4 rounded-xl text-white font-bold"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify"}
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
