import Image from "next/image";
import bgLeft from "../../../public/background-floated-right.png"

const BackgroundLeft = () => {
    return (
        <div className="left-0 absolute -z-50 top-0">
            <Image src={bgLeft} width={850} height={650} alt="Circle Left" />
        </div>
    )
}

export default BackgroundLeft