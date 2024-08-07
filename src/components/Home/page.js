import Image from "next/image"

export default function Home() {
    return (
        <section className="w-full h-[55vh] md:h-[100vh] flex justify-center relative bg-cover bg-bottom bg-[url('/homeMobile.svg')] md:bg-[url('/home.svg')]">
            <div className="flex justify-between items-center absolute top-3 md:top-6 self-center w-11/12">
                <Image src="/logo.png" alt="logo" width={90} height={90} className="w-[50px] h-[50px] xl:w-[80px] xl:h-[80px]" />
                <button className="bg-[#006231] flex justify-center items-center rounded-md text-xs md:text-sm xl:text-lg text-white p-2 ">Contact Us</button>
            </div>
            <h1 className="text-[1.5rem] md:text-[3rem] lg:text-[5rem] text-center font-semibold opacity-25 mt-[6rem] md:mt-[12rem]">UNLEASH YOUR POTENTIAL</h1>
        </section>
    )
}