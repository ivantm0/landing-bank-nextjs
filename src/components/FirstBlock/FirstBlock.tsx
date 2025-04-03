"use client"

import Link from "next/link"
import BackgroundRight from "../BackgroundRight/BackgroundRight"
import MotionTransition from "../MotionTransition/MotionTransition"
import Image from "next/image"
import Reveal from "../Reveal/Reveal"
import cardsBlock from "../../../public/cards-block.png"

const FirstBlock = () => {
    return (
        <div className="relative p-4 md:py-40">
            <BackgroundRight />
            <div className="grid max-w-5xl mx-auto md:grid-cols-2">
                <div>
                    <Reveal>
                        <h1 className="text-5xl font-semibold">
                            El nuevo
                            <span className="block degradedBlue bg-blueLight">
                                banco digital
                            </span>
                            para todos
                        </h1>
                    </Reveal>
                    <Reveal>
                        <p className="max-w-md mt-10">Nuestro equipo de expertos utiliza una metodología
                            para identificar las tarjetas de crédito que probablemente
                            se ajusten a sus necesidades. Examinamos tasas
                            porcentuales anuales, tarifas anuales.</p>
                    </Reveal>
                    <Reveal>
                        <div className="my-8">
                            <Link href="#clients" className="px-4 py-3 rounded-md bg-blueRadial">Empieza ahora</Link>
                        </div>
                    </Reveal>
                </div>
                <MotionTransition className="flex items-center justify-center">
                    <Image src={cardsBlock} alt="Card" width={450} height={450} className="h-auto w-72 md:w-full" />
                </MotionTransition>
            </div>
        </div>
    )
}

export default FirstBlock