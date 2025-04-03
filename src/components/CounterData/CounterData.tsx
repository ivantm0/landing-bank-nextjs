"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import MotionTransition from "../MotionTransition/MotionTransition";
import { dataCounter } from "./CounterData.data";

const CounterData = () => {
    return (
        <MotionTransition className="max-w-5xl py-10 mx-auto md:py-64">
            <div className="justify-between md:flex">
                {dataCounter.map(({ id, startNumber, endNumber, text }) => (
                    <CounterItem key={id} startNumber={startNumber} endNumber={endNumber} text={text} />
                ))}
            </div>
        </MotionTransition>
    );
};

export default CounterData;

const CounterItem = ({ startNumber, endNumber, text }: { startNumber: number; endNumber: number; text: string }) => {
    const { ref, inView } = useInView({ triggerOnce: true });

    return (
        <div ref={ref} className="py-5 text-2xl text-center md:text-left">
            + {inView && <CountUp start={startNumber} end={endNumber} duration={1.5} />}{" "}
            <span className="degradedBlue bg-blueLight">{text}</span>
        </div>
    );
};
