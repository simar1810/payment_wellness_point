import Image from "next/image";
import { FaHeart } from "react-icons/fa";

export default function Coach() {
    return (
        <section className="w-full flex flex-col md:flex-row  justify-center">
            <div className="w-full md:w-[45%]">
            <Image src = "/personalisedCoach.svg" alt="coach" width={440} height={400} className="w-full"  /></div>
            <div className="w-full md:w-[55%] flex flex-col p-[1rem] mt-4 md:mt-0 lg:pl-[2rem] xl:pr-[8rem] justify-center items-start">
                <div className="flex justify-center items-center font-semibold  lg:text-[1.2rem] gap-1 border-b-2 border-[#FFBE0B]">
                    Transform your  <FaHeart className=" fill-red-500"/>  Health with
                </div>
                <h1 className="text-[1.5rem] lg:text-[3rem] font-semibold leading-[2rem] lg:leading-[3.2rem] my-2">Personalised Nutrition Coaching</h1>
                <p className="text-[0.7rem] lg:text-[0.9rem] my-2">Welcome to Nutritionist, your partner in achieving optimal health through personalized nutrition coaching. 
                    Our certified nutritionists are here to guide you on your weight loss journey, providing customized plans 
                    and ongoing support. Start your transformation today and experience the power of personalized nutrition coaching.
                </p>

                <div className="flex gap-4 my-3 items-center">
                    <button className="flex justify-center items-center p-3 font-semibold text-[0.7rem] rounded-md bg-[#FFBE0B] ">Get Started Today</button>
                    <button className="flex justify-center items-center p-3 font-semibold text-[0.7rem] rounded-md bg-[#E5F5BD] ">Book a Demo</button>
                </div>

                <div className="flex justify-center items-center text-[0.7rem] lg:text-[0.9rem] font-semibold mt-7 md:mt-3 xl:mt-14 gap-2 ">
                    <Image src="/dp.svg" width={130} height={40} alt="dp" className="w-[70px] lg:w-[100px] lg:h-[60px]" />
                    <span className="text-[#468671]">430+</span>
                    <h6>Happy Customers</h6>
                </div>
            </div>
        </section>
    )
}