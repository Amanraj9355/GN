"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

const CtaBanner = () => {
   const handleClick = () => {
    document
      .getElementById("giftfinder")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="my-10 px-6 sm:px-8 lg:px-0 w-full md:max-w-6xl md:mx-auto">
      <div className="bg-[#111827] rounded-2xl px-2 sm:px-12 lg:px-16 py-5 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative">
        {/* Left */}
        <div className="w-full md:w-7/12 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            Find the Perfect Gift
          </h2>
          <p className="text-white/70 text-sm sm:text-base lg:text-lg mt-3 max-w-xl mx-auto md:mx-0">
            Curated gift sets for every occasion and person in your life.
          </p>
          <div onClick={handleClick} className="mt-6 inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-white text-sm sm:text-base hover:bg-white/10 transition-all duration-200 cursor-pointer group">
            Find Out Now
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-5/12 flex items-center  justify-center md:justify-end mt-10 md:mt-0">
          <img
            src="/CtaBannerImg.png"
            alt="Gift banner"
            className="w-4/5 sm:w-3/5 lg:w-2/3 animate-customBounce"
          />
        </div>
      </div>
    </div>
  );
};

export default CtaBanner;
