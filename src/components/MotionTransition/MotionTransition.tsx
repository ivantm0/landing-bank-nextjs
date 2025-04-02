import { useEffect, useRef } from "react";
import { useAnimation, useInView, motion } from "framer-motion";
import { fadeIn } from "../../utils/transitions";

type Props = {
    children: React.ReactNode;
    className?: string;
  };

const MotionTransition = ({children, className}: Props) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false })
    const mainControls = useAnimation()
    const slideControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
            slideControls.start("visible")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView])


    return (
        <div ref={ref}>
            <motion.div
                variants={fadeIn()}
                initial="hidden"
                animate={mainControls}
                exit="hidden"
                className={className}
            >
                {children}
            </motion.div>
        </div>
    )
}

export default MotionTransition