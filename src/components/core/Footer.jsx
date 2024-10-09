import Link from "next/link";
import React from "react";
// import { FaXTwitter } from "react-icons/fa6";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedin,
//   FaYoutube,
// } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full min-h-min bottom-0 gap-8 px-2 py-6 md:px-32 md:py-16 bg-[#F5F5F5] text-[#272727] flex md:justify-between ">
      <div className="h-auto flex-col  gap-4 justify-center w-44">
        <Link href="https://www.thewellnesspoint.club/" target="_blank" className=" mb-6 flex justify-center">
          <img src="/wc-logo-white.png" className="h-24" alt="" />
        </Link>
      </div>

      <div>
        <div className="flex justify-between md:gap-14 gap-4">
          {/* <div className="flex-col justify-center text-sm">
            <div className="flex justify-center mb-6 font-bold">Company</div>
            <Link href={"https://www.wellnessz.in/about"} target="_blank" >
              <div className="flex justify-center">About us</div>
            </Link>
          </div> */}
          <div className="flex-col  md:justify-center text-sm">
            <div className=" mb-4 md:mb-6 flex md:justify-center font-bold">
              Legal
            </div>
            <Link href={"/terms"} target="_blank" >
              <div className="flex justify-center">Terms & Conditions</div>
            </Link>
          </div>
          {/* <div className="flex-col justify-center text-sm">
            <div className="flex justify-center mb-6 font-bold">Resources</div>
            <Link href={"https://www.wellnessz.in/blogs"} target="_blank" >
              <div className="flex justify-center">Blog</div>
            </Link>
          </div> */}
        </div>

        {/* <div className="social media flex justify-center md:justify-normal mt-8 md:mt-24 gap-8">
          <Link href="https://www.linkedin.com/company/wellnessz/" target="_blank" >
            <img src="/linkedin.png" alt="linkedin" />
          </Link>
          <Link href="https://www.facebook.com/profile.php?id=61553253021745&mibextid=ZbWKwL/" target="_blank" >
            <img src="/facebook.png" alt="facebook" />
          </Link>
          <Link href="https://instagram.com/wellnessz_official?igshid=MzMyNGUyNmU2YQ==" target="_blank" >
            <img src="/instagram.png" alt="instagram" />
          </Link>
          <Link href="#">
            <img src="/twitter.png" alt="twitter" target="_blank" />
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
