import Image from "next/image";

export default function Features() {
    const data = [
        {
            image: "/i1.svg",
            name: "Personalized Nutrition Plans",
            desc: "Receive a tailored nutrition plan designed specifically for your body and goals. Our certified nutritionists will consider your unique needs, dietary preferences, and health conditions to create a plan that suits you best.",
        },
        {
            image: "/i2.svg",
            name: "Guidance from Certified Nutritionists",
            desc: "Our team of experienced and certified nutritionists will provide professional guidance and support throughout your journey. They will answer your questions, address your concerns, and keep you motivated as you work towards your goals.",
        },
        {
            image: "/i3.svg",
            name: "Food Tracking and Analysis",
            desc: "Effortlessly track your food intake using our user-friendly app. Our nutritionists will analyze your data to provide insights into your eating habits, help you identify areas for improvement, and make personalized recommendations.",
        },
        {
            image: "/i4.svg",
            name: "Meal Planning and Recipes",
            desc: "Access a vast collection of delicious and healthy recipes tailored to your dietary needs. Our nutritionists will also create personalized meal plans, making it easier for you to stay on track and enjoy nutritious meals.",
        },
        {
            image: "/i5.svg",
            name: "Lifestyle and Behavior Coaching",
            desc: "Achieving sustainable results requires more than just a diet plan. Our nutritionists will work with you to develop healthy habits, address emotional eating, and provide strategies to overcome obstacles along the way.",
        },
        {
            image: "/i6.svg",
            name: "Nutritional Education and Workshops",
            desc: "Expand your knowledge of nutrition through informative articles and educational workshops. Our nutritionists will equip you with the knowledge and tools to make informed choices for long-term success.",
        },
    ]
    return (
        <section className="w-full h-full pb-10 mt-[2rem] bg-[url('/features.png')] bg-cover bg-center flex flex-col justify-aruond items-center">
            <h1 className="text-[2rem] font-semibold mt-16">Features</h1>
            <p className="text-[0.8rem] mt-4 mb-10 p-3 text-center">Welcome to the Feature Section of Nutritionist, your ultimate destination for all things nutrition and wellness.</p>
            <div className="w-full flex justify-center items-center flex-wrap gap-6">
                {
                    data.map((item, index) => (
                        <div key={index} className="w-[90%] md:w-[45%] xl:w-[40%] min-h-[170px] flex flex-col bg-white rounded-md px-6 md:px-8 py-6 gap-3" >
                            <div className="flex justify-start items-center">
                                <Image src={item.image} width={69} height={69} alt="icon" className="w-[35px] h-[35px] md:w-[45px] md:h-[45px]" />
                                <h1 className="text-[1rem] md:text-[1.2rem] pl-2">{item.name}</h1>
                            </div>
                            <p className="text-[0.7rem] opacity-90">{item.desc}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}