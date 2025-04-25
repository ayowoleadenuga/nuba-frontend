"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./cards.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { revolutioniseList } from "@/components/homepage/constants";
import PaymentCard from "@/components/homepage/components/payment-card";
import { RevolutioniseListType } from "@/types";

export default function PaymentCardMobile() {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          //   slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {revolutioniseList.map((item: RevolutioniseListType, index: number) => {
          return (
            <SwiperSlide>
              <PaymentCard key={index} item={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
