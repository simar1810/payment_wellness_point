import apiInstance from "@/helpers/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ConnectAppStep2 = ({ data, loading, setData, setLoading, setStep }) => {
  const [inputValue, setInputValue] = useState("");
  const [otp, setOtp] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpResend, setOtpResend] = useState(false);
  const router = useRouter();

  const verifyOtp = async (value, otp) => {
    setLoading(true);
    try {
      const { data, status } = await apiInstance.verifyOtpToConnectClub({
        credential: value,
        otp: otp,
      });
      console.log(data, status);
      if (status === 200) {
        setStep(3);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message || error.response.data.error);
    }
    setLoading(false);
  };

  const sendOtp = async (value) => {
    setLoading(true);
    try {
      const { data, status } = await apiInstance.sendOtpToConnectClub({
        credential: value,
      });
      console.log(data, status);
      if (status === 200) {
        toast.success(
          `OTP has been sent to your ${isMobile ? "Mobile number" : "Email"}`
        );
        setOtpSent(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "You are not registered in App") {
        router.push("https://linktr.ee/WellnessZ");
      }
      // toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      toast.error("Please enter Mobile Number or Email");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    const numberRegex = /^\d+$/;

    if (emailRegex.test(inputValue)) {
      setIsEmail(true);
      setIsMobile(false);
      !otpSent && sendOtp(inputValue);
    } else if (numberRegex.test(inputValue) && inputValue.length === 10) {
      setIsMobile(true);
      setIsEmail(false);
      !otpSent && sendOtp(inputValue);
    } else {
      setIsMobile(false);
      setIsEmail(false);
      toast.error("Please enter a valid Mobile Number or Email");
      return;
    }

    if ((isEmail || isMobile) && otpSent && otp.trim() === "") {
      toast.error("Please enter OTP");
      return;
    }

    setData({ ...data, mobileOrEmail: inputValue, otp: otp });

    if (inputValue && otp) {
      verifyOtp(inputValue, otp);
    }
  };

  const handleResend = () => {
    setOtpResend(true);

    const timerId = setTimeout(() => {
      setOtpResend(false);
      clearTimeout(timerId);
    }, 60000);

    if (isMobile) {
      sendOtp(inputValue);
      toast.success("OTP has been sent to your mobile number");
    }
    if (isEmail) {
      sendOtp(inputValue);
      toast.success("OTP has been sent to your email");
    }
  };

  return (
    <>
      <div className='mb-4 text-center'>
        <h2 className='text-3xl font-bold text-[#036231] mb-4'>
          Connect App with TWP Club
        </h2>
        <p className='text-gray-300 text-md font-semibold text-start'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <form
        className='flex flex-col justify-start gap-8 my-6 text-lg'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-4'>
          <label className=' font-semibold'>
            {isMobile && otpSent
              ? "Mobile Number"
              : isEmail && otpSent
                ? "Email"
                : " Mobile Number or Email"}
          </label>
          <input
            type='text'
            placeholder='Enter Mobile Number or Email'
            className='border-2 border-gray-300 rounded-xl p-4 px-6 outline-none'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {(isMobile || isEmail) && otpSent && (
            <button
              type='button'
              {...(otpResend && { disabled: true })}
              className={`border border-[#036231] bg-white text-[#036231] p-3 rounded-xl font-semibold self-start px-6  ${otpResend && "opacity-50 cursor-not-allowed"
                }`}
              onClick={() => handleResend()}
            >
              Re-Send OTP
            </button>
          )}
        </div>

        {(isMobile || isEmail) && otpSent && (
          <div className='flex flex-col gap-4'>
            <label className=' font-semibold'>OTP (One Time Password)</label>
            <input
              type='number'
              placeholder='Enter OTP'
              className='border-2 border-gray-300 rounded-xl p-4 px-6 outline-none'
              value={otp}
              min={0}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}
        <button
          type='submit'
          className='bg-[#036231] text-white p-3 rounded-xl font-semibold self-center px-12 py-4 mt-4'
        >
          {loading
            ? "Loading..."
            : (isMobile || isEmail) && otpSent
              ? "Continue"
              : "Send OTP"}
        </button>
      </form>
    </>
  );
};

export default ConnectAppStep2;
