"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer/page';

const RedirectApp = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectToStore = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/android/i.test(userAgent)) {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.wellnessz.twp';
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.location.href = 'https://apps.apple.com/in/app/the-wellness-point/id6504709088';
      }
    };

    redirectToStore();
  }, [router]);

  return <>
    <section className="w-full min-h-[100vh] bg-[url('/appRouteBg.svg')] bg-cover bg-no-repeat flex justify-center items-center px-6 md:px-12 ">

      <div className="flex flex-col lg:flex-row justify-between items-center h-full mt-8 text-white gap-[5rem]">

        <div className="flex flex-col items-center lg:items-start lg:pl-6 lg:w-[40%] mt-[5rem] md:mt-[10rem] lg:mt-0 text-center lg:text-left">
          <h1 className="text-[1.2rem] md:text-[1.5rem] lg:text-[3rem] font-bold lg:mb-12 lg:leading-[3.5rem] ">Download the <br />
            <span className='md:text-[2.7rem] text-[2rem] lg:text-[3rem] text-white opacity-100'>Wellness Point App</span>
          </h1>
          <p className="text-sm md:text-xl mb-5 opacity-70 ">Begin your journey Towards Making People Healthy</p>
          <div className="flex justify-between items-center gap-5 mb-5">
            <Link href="https://play.google.com/store/apps/details?id=com.wellnessz.twp" target="_blank">
              <Image src="/playstore.png" alt="Google Store" width={150} height={40} className="cursor-pointer" />
            </Link>
            <Link href="https://apps.apple.com/in/app/the-wellness-point/id6504709088" target="_blank">
              <Image src="/appStore.png" alt="App Store" width={150} height={60} className="cursor-pointer" />
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center mr-2 md:mr-12">
          <Image src="/appRouteMobile.png" alt="WellnessZ App Screens" width={900} height={900} className="w-full self-center md:w-[850px]" />
        </div>
      </div>
    </section>
    <Footer />
  </>
};

export default RedirectApp;
