import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const handleClick = () => {
    document
      .getElementById("collections")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="py-5 md:py-20 h-[60%] sm:h-[85%] my-4 flex items-center justify-center flex-col gap-8 px-4 relative max-w-screen">
      <img
        src="/headerLeft.png"
        className="absolute w-[25%] hidden sm:block sm:-left-24 -bottom-16 animate-customBounce"
      />
      <img
        src="/headerRight.png"
        className="absolute w-[25%]  hidden sm:block sm:-right-24 -bottom-16 animate-customBounce"
      />

      <div className="text_ctr flex items-center justify-center flex-col text-center z-10">
        <div className="heading_ctr text-2xl sm:text-5xl md:text-6xl  font-semibold leading-tight">
<span className="bg-gray-800 text-white p-2 text-4xl sm:text-5xl md:text-7xl lg:text-8xl inline-block mb-3">Gifts That Speaks</span><br /> From the Heart 🎁
        </div>
        <div className="subheading_ctr text-md sm:text-lg mt-4 sm:w-[75%] text-gray-800">
          Discover unique gifts for every occasion, curated with care and
          delivered with love.
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 z-10">
         <Link
            onClick={() => scrollTo(0, 0)} to={"/categories"}>
          <div className="explore_btn flex items-center justify-center bg-[#111827] rounded-full text-white px-8 py-4 text-sm cursor-pointer hover:bg-[#1d283f] duration-200 ease-in-out">
            Explore Collections
            <span className="bi bi-arrow-right ml-2 flex items-center justify-center"></span>
          </div>
        </Link>

        <button
          onClick={handleClick}
          className="explore_btn flex items-center justify-center bg-[#e0e0e0] rounded-full font-semibold px-8 py-4 text-sm cursor-pointer hover:bg-[#d4d4d4] duration-200 ease-in-out"
        >
          View All Gifts
          <span className="bi bi-gift-fill ml-2 flex items-center justify-center"></span>
        </button>

        <img className="block md:hidden" src="/headerRight.png" alt="" />
      </div>
    </div>
  );
};

export default HeroSection;
