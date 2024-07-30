"use client";
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

// Define the numbers data
const numbersData = [
    { value: 500, postfix: "+", label: "Happy Members", note: "Our community is growing fast" },
    { value: 5, postfix: "+", label: "Year Experience", note: "Experience in various workouts"},
    { value: 13, postfix: "+", label: "Certified Trainers", note: "Guidance at every step" },
    { value: 90, postfix: "%", label: "Customer Satisfaction", note: "We ensure your progress satisfactoion" },
];

const AnimatedNumber = ({ number }) => {
    const { ref, inView } = useInView({
        threshold: 0.5, // Trigger animation when 50% of element is in view
        triggerOnce: false, // Allow animation to trigger every time it comes into view
    });

    const [animatedNumber, setAnimatedNumber] = useState(0);

    useEffect(() => {
        if (inView) {
            setAnimatedNumber(number);
        } else {
            setAnimatedNumber(0);
        }
    }, [inView, number]);

    const props = useSpring({
        number: animatedNumber,
        from: { number: 0 },
        config: { mass: 1, tension: 120, friction: 20, duration: 2500 },
    });
    return (
        <animated.div ref={ref}>
            {props.number.to((n) => n.toFixed(0))}
        </animated.div>
    );
};

export default function Numbers() {
    return (
        <div className="w-full bg-[#006231] flex flex-wrap gap-8 md:gap-6 lg:gap-[3rem] p-3 lg:px-[1.5rem] text-white justify-center">
            {numbersData.map((item, index) => (
                <div key={index} className="w-full md:w-[45%] lg:w-[20%] flex flex-col items-center lg:items-start md:text-left my-4">
                    <span className="flex font-semibold text-[1.7rem] md:text-[1.8rem]">
                        <AnimatedNumber number={item.value} /> 
                        {item.postfix}
                    </span>
                    <span className="text-[0.7rem] md:text-[0.8rem] md:mr-4">
                        {item.label}
                    </span>
                    <span className="text-[0.7rem] opacity-90 md:text-[0.7rem]">{item.note}</span>
                </div>
            ))}
        </div>
    )
}