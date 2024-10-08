"use client";
import Footer from "@/components/core/Footer";
import apiInstance from "@/helpers/api";
import usePasswordValidation from "@/hooks/usePasswordValidation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoCheckmarkSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { TailSpin } from "react-loader-spinner";

const ForgotPassword = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    loading: false,
  });
  const { email, password, loading, otp } = values;

  const { passwordValidation, validatePassword } = usePasswordValidation();

  const verifyOtp = async (e) => {
    console.log("otp => ", otp);
    console.log("password => ", password);
    e.preventDefault();

    if (!email || email.length === 0) {
      toast.error("Email can not be empty");
      return;
    } else if (!otp || otp.length === 0) {
      toast.error("Otp can not be empty");
      return;
    } else if (!password || password.length === 0) {
      toast.error("Password can not be empty");
      return;
    } else if (
      passwordValidation.length === false ||
      passwordValidation.lowercase === false ||
      passwordValidation.uppercase === false ||
      passwordValidation.specialChar === false
    ) {
      toast.error("Password should match the required criteria");
      return;
    }

    setValues({ ...values, loading: true, error: false });
    try {
      const { data, status } = await apiInstance.verifyForgotPasswordOTP({
        email,
        otp,
        newPassword: password,
      });

      if (status === 200) {
        toast.success("Password Updated successfully");
        router.push("/login");
        setValues({
          email: "",
          password: "",
          otp: "",
          loading: false,
        });
      }
    } catch (err) {
      console.log("error in verifyOtp => ", err);
      toast.error(err.response.data.error || "Error while updating password");
      setValues({ ...values, loading: false, error: false });
    }
  };

  const sendOtp = async (e) => {
    console.log("email => ", email);
    e.preventDefault();

    if (!email || email.length === 0) {
      toast.error("Email can not be empty");
      return;
    }

    setValues({ ...values, loading: true, error: false });
    try {
      const { data, status } = await apiInstance.forgotPasswordOTP({
        email,
        clubClientId: "wellnessz_club",
      });

      if (status === 200) {
        toast.success("Otp sent successfully to your email");
      }
    } catch (err) {
      console.log("error in sendOtp => ", err);
      toast.error(err.response.data.error || "Error while sending OTP");
    }
    setValues({ ...values, loading: false, error: false });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
    if (name === "password") {
      validatePassword(e.target.value);
    }
  };

  return (
    <>
      <form autoComplete="off">
        <div className="relative flex min-h-screen bg-[#171717] text-gray-800 antialiased flex-col justify-center overflow-hidden py-6 sm:py-12">
          {loading && (
            <div className="flex justify-center">
              <TailSpin
                color="white"
                height="30"
                width="30"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          )}

          <div className="relative py-3 sm:w-96 mx-auto text-center">
            <span className="text-2xl font-light text-lime-400">
              Forgot Your Password
            </span>
            <div className="mt-4 bg-black shadow-md rounded-lg text-left">
              <div className="h-2 bg-lime-400 rounded-t-md"></div>
              <div className="px-8 py-6 ">
                <label className="block font-semibold text-white"> Email </label>
                <input
                  value={email}
                  onChange={handleChange("email")}
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="w-full h-5 px-3 py-5 mt-2 text-white bg-[#272727] outline-none focus:outline-none focus:ring-lime-400 focus:ring-1 rounded-md"
                />
                <button
                  onClick={sendOtp}
                  className="mt-4  bg-lime-400 text-white py-2 px-6 rounded-md hover:bg-lime-400"
                >
                  Send OTP
                </button>
                <label className="block mt-3 font-semibold text-white">
                  {" "}
                  OTP{" "}
                </label>
                <input
                  value={otp}
                  onChange={handleChange("otp")}
                  name="otp"
                  type="number"
                  placeholder="otp"
                  className="w-full h-5 px-3 py-5 mt-2 bg-[#272727] text-white hover:outline-none focus:outline-none focus:ring-lime-400 focus:ring-1 rounded-md"
                />
                <label className="block mt-3 font-semibold text-white">
                  New Password{" "}
                </label>
                <input
                  value={password}
                  onChange={handleChange("password")}
                  name="otp"
                  type="password"
                  placeholder="password"
                  className="w-full h-5 px-3 py-5 mt-2 bg-[#272727] text-white hover:outline-none focus:outline-none focus:ring-lime-400 focus:ring-1 rounded-md"
                />
                {password && (
                  <div className="mt-3 text-white text-sm flex flex-col gap-1 mb-2">
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
                <div className="flex justify-center">
                  <button
                    onClick={verifyOtp}
                    className="mt-4  bg-lime-400 text-white py-2 px-6 rounded-md hover:bg-lime-400 "
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default ForgotPassword;
