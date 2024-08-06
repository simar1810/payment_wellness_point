import React from "react";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaRegEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default function Footer() {
    return (
        <section className="w-[100%] flex flex-col bg-[#EFF0F6] px-8 xl:px-20 py-6 md:text-[0.8rem] ">
            <div className="flex gap-20 md:gap-6 lg:gap-0 flex-wrap justify-between py-12 ">
                <div className="flex flex-col gap-3 w-full md:w-[25%]">
                    <Image src = "/logo.png" alt="logo" width={89} height={89} className="md:self-center" />
                    <p className="opacity-60">Powered by WellnessZ As TNJ</p>
                    <div className="flex gap-4 cursor-pointer text-[#006231] ">
                        <FaFacebookF/>
                        <FaTwitter/>
                        <FaInstagram/>
                        <FaLinkedinIn/>
                        <FaYoutube/>
                    </div>
                </div>
                {/* <div className="flex w-full md:w-[auto] justify-between gap-10 items-start"> */}
                <div className="w-[30%] md:w-[auto] flex flex-col gap-2">
                    <h1 className="md:mb-4 opacity-100 font-bold">Product</h1>
                    <h3 className="opacity-60">Features</h3>
                    <h3 className="opacity-60">Pricing</h3>
                    <h3 className="opacity-60">Reviews</h3>
                    <h3 className="opacity-60">Updates</h3>
                </div>
                <div className="w-[30%] md:w-[auto] flex flex-col gap-2">
                    <h1 className="md:mb-4 opacity-100 font-bold">Company</h1>
                    <h3 className="opacity-60">About</h3>
                    <h3 className="opacity-60">Contact Us</h3>
                    <h3 className="opacity-60">Careers</h3>
                    <h3 className="opacity-60">Culture</h3>
                    <h3 className="opacity-60">Blog</h3>
                </div>
                {/* </div> */}
                <div className="hidden md:flex flex-col gap-2">
                    <h1 className="md:mb-4 opacity-100 font-bold">Support</h1>
                    <h3 className="opacity-60">Getting started</h3>
                    <h3 className="opacity-60">Help center</h3>
                    <h3 className="opacity-60">Server status</h3>
                    <h3 className="opacity-60">Report a bug</h3>
                    <h3 className="opacity-60">Chat support</h3>
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="md:mb-4 opacity-100 font-bold">Contact us</h1>
                    <div className="opacity-60 flex items-center gap-3"><FaRegEnvelope/> contact@company.com</div>
                    <div className="opacity-60 flex items-center gap-3"><FaPhoneAlt/> (414) 687 - 5892</div>
                    <div className="opacity-60 flex items-center gap-3"><FaLocationDot/> 794 Mcallister St San Francisco, 94102</div>
                </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 items-center justify-between border-t-2 pt-4 border-gray-500">
                <p className="opacity-60">Copyright © 2022 Company</p>
                <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
                    <span className="px-2 opacity-70">All Rights Reserved</span>
                    <div className="text-[0.7rem] md:text-[0.8rem]">
                        <u className="text-[#0168A8] px-2 border-x-2 cursor-pointer border-gray-500">Terms and Conditions</u>
                        <u className="text-[#0168A8] px-2 cursor-pointer ">Privacy Policy</u>
                    </div>
                </div>
            </div>
        </section>
    )
}