import React from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
    fade: true,
  };

  return (
    <div className="w-full 2xl:max-w-6xl 2xl:mx-auto my-10 sm:my-5 scale-200 sm:scale-100">
    <Slider {...settings}>
      <div>
        <img src="/poster1.jpg" alt="" className="ml-16 sm:ml-0"/>
      </div>
      <div>
        <img src="/poster2.jpg" alt="" className="ml-16 sm:ml-0"/>
      </div>
    </Slider>
    </div>
  );
}
