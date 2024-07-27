import Image from "next/image";

export default function Join() {
    return (
        <section className="w-full flex bg-gradient-to-b from-[#7AC143] to-[#03632C]">
            <div className="w-full lg:w-[60%] flex flex-col justify-between p-4 md:p-[4rem]">
                <h1 className="text-[1.2rem] md:text-[2rem] xl:text-[2.7rem] text-center lg:text-left text-white font-semibold">Join the Fitness Revolution Now</h1>

                <Image src="/mobile.svg" alt="mobile" width={500} height={500} className="w-[80%] lg:hidden self-center" />

                <div className="flex flex-col justify-center items-center lg:items-start">
                    <p className="text-[0.7rem] text-white md:pl-1"> Download the Wellness Point app  now</p>
                    <div className="my-2 flex gap-2">
                        <Image src="/googlePlay.svg" alt="google play" width={140} height={60} />
                        <Image src="/appStore.svg" alt="app store" width={140} height={60} />
                    </div>
                </div>
            </div>
            <Image src="/mobile.svg" alt="mobile" width={500} height={500} className="hidden lg:block " />
        </section>
    )
}