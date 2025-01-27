"use client";
import React, { useEffect, useRef, useState } from "react";
import RegisterModal from "./Register";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiLockPasswordLine } from "react-icons/ri";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import apiInstance from "@/helpers/api";
import { setClubSystem } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import Footer from "@/components/core/Footer";
import Image from "next/image";
import { FaEye } from "react-icons/fa";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const passwordRef = useRef()

  useEffect(() => {
    const checkClubCoach = async () => {
      try {
        const { data, status } = await apiInstance.isClubCoach();
        console.log("isClubCoach api res => ", data);
        if (data.status) {
          // if (status === 200) {
          router.push("/club-dashboard");
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkClubCoach();
  }, []);

  async function Login(data) {
    const toastId = toast.loading("Validating...");

    try {
      const payload = {
        email: data.get("email"),
        password: data.get("password"),
      };

      const res = await apiInstance.login(payload);
      console.log("response of login api => ", res);

      if (res.status === 200) {
        toast.success("Logged in Successfully, Redirecting to dashboard...");
        const isRemember = data.get("checkbox") === "on";
        // console.log("isRemember => ", isRemember)
        Cookies.set(
          "coachId",
          res?.data?.data?._id,
          isRemember && { expires: 20 }
        );
        Cookies.set(
          "refreshToken",
          res?.data?.data?.refreshToken,
          isRemember && { expires: 20 }
        );
        dispatch(setClubSystem(parseInt(res?.data?.data?.clubSystem) ?? 1));
        router.push("/club-dashboard");
      }
    } catch (error) {
      console.log("error in Login fn => ", error);
      toast.error("Login Failed");
    }

    toast.dismiss(toastId);
  }

  return (
    <>
      <RegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className='md:px-12 px-4 py-12 pb-40 flex-col w-full min-h-min bg-white text-[whitesmoke]'>
        <Link href="https://www.thewellnesspoint.club" target="_blank" className='flex-shrink-0 flex items-center'>
          <Image
            src='/wc-logo-black.svg'
            className='h-28 w-28 rounded-full'
            alt='logo'
            height={100}
            width={100}
          />
        </Link>

        {/* <h1 className="text-4xl  font-extrabold px-3 py-10 ">Club Login</h1> */}

        <div className='form rounded-2xl  border-dashed border-gray-200 border-2 p-2 '>
          <div className="bg-[url('/Login-bg.png')] bg-cover bg-center rounded-2xl">
            <div className='md:flex justify-between items-center bg-left  py-5  px-4 relative md:h-[590px] md:w-auto rounded-2xl  backdrop-brightness-50 '>
              <div className='  mt-auto md:mb-12 md:ml-20  flex-col items-baseline align-bottom  '>
                <span className=' text-2xl md:text-3xl font-bold tracking-wider'>
                  Welcome to
                </span>
                <div className='text-4xl md:text-5xl mt-2 mb-5 md:my-5  text-[#036231] font-extrabold '>
                  The Well Point CLUB
                </div>
              </div>

              <div className='form flex-col  justify-center items-center md:w-2/5'>
                <h1 className=' shadow-sm text-3xl font-extrabold'>
                  Login To Your Account
                </h1>
                <span className='flex text-sm my-4'>
                  {" "}
                  Please enter your details for Log in
                </span>

                <form action={Login}>
                  <div className='bg-[#ECECEC] text-black p-2 rounded-lg flex '>
                    <div className='flex items-end pb-1 mr-5 ml-3'>
                      <img src='/usericon.png' alt='' />
                    </div>
                    <div className='overflow-clip px-2'>
                      <label htmlFor='email' className='text-xs px-1'>
                        Email
                      </label>
                      <br />
                      <input
                        type='email'
                        required
                        className='font-bold bg-[#ECECEC] text-sm p-1 pt-0 outline-none  border-b-2 '
                        name='email'
                        id='loginEmail'
                        placeholder='Please enter Email'
                      />
                    </div>
                  </div>

                  <div className='bg-[#ECECEC] text-black p-2 rounded-lg flex mt-5'>
                    <div className='flex items-end  pb-2 mr-5 ml-3'>
                      <RiLockPasswordLine size={25} className='text-gray-500' />
                    </div>

                    <div className='grow overflow-clip px-2'>
                      <label htmlFor='password' className='text-xs px-1'>
                        Password
                      </label>
                      <br />
                      <div className="relative">
                        <input
                          type='password'
                          required
                          ref={passwordRef}
                          className='w-full font-bold bg-[#ECECEC] text-sm p-1 outline-none  border-b-2 '
                          name='password'
                          id='password'
                          onClick={e => passwordRef.current.type === ""}
                          placeholder='Please enter Password'
                        />
                        <FaEye
                          onClick={e => passwordRef.current.type === "password" ? passwordRef.current.type = "text" : passwordRef.current.type = "password"}
                          className="w-5 h-5 absolute right-4 top-1/2 translate-y-[-100%] cursor-pointer select-none" />
                      </div>
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <input
                      type='checkbox'
                      name='checkbox'
                      id='checkbox'
                      className='cursor-pointer'
                    />
                    <label
                      htmlFor='checkbox'
                      className='text-sm font-bold text-[#036231] my-4 cursor-pointer'
                    >
                      Remember me
                    </label>
                  </div>

                  <button
                    type='submit'
                    className=' login w-full text-center bg-[#036231]  p-2 rounded-lg flex justify-center py-4 mt-5'
                  >
                    Login
                  </button>
                </form>
                <div className='flex gap-1 text-sm my-5 items-center'>
                  <Link href='/forgot-password' className='cursor-pointer'>
                    Forgot Password?
                  </Link>
                </div>

                <div className='flex gap-1 text-sm my-5 items-center w-full justify-center mt-8'>
                  <span className='text-[#036231]'>Dont Have an Account?</span>
                  <Link href='/register'>Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
