import Image from "next/image";

export default function Who() {
    return (
        <section className="flex flex-col lg:flex-row my-10">
            <Image src="/who.svg" alt="us" width={500} height={500} className="w-full lg:w-[50%]" />
            <div className="w-full lg:w-[50%] flex flex-col justify-center items-start p-4 py-6 md:p-[4rem] text-left bg-[#006231]">
                <h1 className="text-[#FFBE0B] md:text-[1.4rem] font-semibold">WHO WE ARE</h1>
                <h2 className="text-[1.2rem] md:text-[1.7rem] text-white font-semibold">We Help To Get Become Fit</h2>
                <p className="text-[0.8rem] md:text-[1.1rem] text-white my-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,</p>
            </div>
        </section>
    )
}