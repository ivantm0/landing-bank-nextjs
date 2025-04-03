"use client"

import 'swiper/css'
import BackgroundRight from '../BackgroundRight/BackgroundRight'
import { Swiper, SwiperSlide } from 'swiper/react'
import { dataPaymentMethods } from './Payments.data'
import Image from 'next/image'
import Dark from '../Dark/Dark'

const Payments = () => {
    return (
        <div className="relative py-20 md:py-64" id="servicios">
            <BackgroundRight />
            <div className="relative w-full overflow-hidden">
                <Swiper
                    breakpoints={{
                        320: {
                            slidesPerView: 8,
                            spaceBetween: 15
                        }
                    }}
                    autoplay={{
                        delay: 1,
                        disableOnInteraction: false
                    }}
                    grabCursor={true}
                    loop={true}
                    speed={2000}
                >
                    <div className="absolute flex">
                        {dataPaymentMethods.map(({ id, image }) => (
                            <SwiperSlide key={id} className="flex items-center slider-horizontal">
                                <Image src={image} alt="Payment" width="70" height="70" className="h-[60px] w-[120px] object-contain" />
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper>
            </div>

            <Dark />
        </div>
    )
}

export default Payments