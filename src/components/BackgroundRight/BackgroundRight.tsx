import Image from "next/image";
import bgRight from "../../../public/background-floated-right.png"

const BackgroundRight = () => {
    return (
        <div className="right-0 absolute -z-50 top-0">
            <Image src={bgRight} width={850} height={650} alt="Circle Right" />
        </div>
    )
}

export default BackgroundRight