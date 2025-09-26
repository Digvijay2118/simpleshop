import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Banner() {
  const slides = [
    { id: 1, image: "/banner1.jpg", text: "Big Discounts on Sneakers!" },
    { id: 2, image: "/banner2.jpg", text: "Upgrade Your Style Today" },
    { id: 3, image: "/banner3.jpg", text: "Shop Smart, Shop SimpleShop" },
  ];

  return (
    <div className="w-full h-[300px] md:h-[400px] mb-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop
        className="h-full"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <div className="relative h-full">
              <img
                src={s.image}
                alt={s.text}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h2 className="text-white text-2xl md:text-4xl font-bold">
                  {s.text}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
