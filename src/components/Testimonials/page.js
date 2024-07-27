"use client"
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonials() {
    const data = [
        {
            image: "/dp1.svg",
            name: "Jennifer Anderson",
            desc: "I can't thank Nutritionist enough for their personalized nutrition coaching. It has completely transformed my approach to food and helped me shed those extra pounds. Highly recommended!",
        },
        {
            image: "/dp2.svg",
            name: "Robert Johnson",
            desc: "Nutritionist has been a game-changer for me. The expert guidance and support I received from their team made my weight loss journey so much easier. Thank you!",
        },
        {
            image: "/dp3.svg",
            name: "Emily Davis",
            desc: "I had struggled with my weight for years until I found Nutritionist. Their personalized approach and tailored nutrition plan made all the difference. I've never felt better!",
        },
        {
            image: "/dp3.svg",
            name: "Emily Davis",
            desc: "I had struggled with my weight for years until I found Nutritionist. Their personalized approach and tailored nutrition plan made all the difference. I've never felt better!",
        },
        {
            image: "/dp3.svg",
            name: "Emily Davis",
            desc: "I had struggled with my weight for years until I found Nutritionist. Their personalized approach and tailored nutrition plan made all the difference. I've never felt better!",
        },
        {
            image: "/dp3.svg",
            name: "Emily Davis",
            desc: "I had struggled with my weight for years until I found Nutritionist. Their personalized approach and tailored nutrition plan made all the difference. I've never felt better!",
        },
    ];

    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024, // Medium devices (tablets)
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600, // Small devices (phones)
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <section className="w-full h-full pb-10 mt-[2rem] flex flex-col justify-around items-center">
            <h1 className="text-[2rem] font-semibold mt-16">Testimonials</h1>
            <p className="text-[0.8rem] mt-2 mb-14 p-3 text-center">Our satisfied clients share their success stories and experiences on their journey to better health and well-being.</p>
            <div className="w-full max-w-[80%]">
                <Slider {...settings} className="w-full gap-6">
                    {data.map((item, index) => (
                        <div key={index} className="flex flex-col bg-[#f4f9e5] justify-between max-w-[94%] md:max-w-[94%] min-h-[150px] md:min-h-[220px] rounded-md mb-4 mx-3 px-6 md:px-8 py-3 gap-3"> {/* Adjusted margin for spacing */}
                            <Image src="/quotes.svg" width={69} height={69} alt="icon" className="w-[35px] h-[35px] md:w-[45px] md:h-[45px]" />
                            <p className="text-[0.7rem] opacity-90 my-4">{item.desc}</p>
                            <div className="flex gap-2 justify-start items-center">
                                <Image src={item.image} alt="dp" width={69} height={69} className="w-[35px] h-[35px] md:w-[45px] md:h-[45px]" />
                                <h1 className="text-[1rem] md:text-[1.2rem] pl-2">{item.name}</h1>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}
