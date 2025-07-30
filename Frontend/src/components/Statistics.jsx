import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Statistics = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div
      ref={ref}
      className="main_ctr w-full md:max-w-6xl md:mx-auto flex items-center justify-center flex-col py-12 px-6 md:px-0 gap-8"
    >
      {/* Heading */}
      <div className="text_ctr flex items-center justify-center flex-col">
        <div className="heading_ctr text-4xl md:text-5xl font-semibold text-center">
          Spreading Joy, <br className="sm:hidden" />
          <span className="bg-[#111827] text-white px-2 py-1 rounded-sm my-2 inline-block">
            One Gift at a Time
          </span>
        </div>
        <div className="subheading_ctr text-lg mt-2 text-center text-gray-600">
          Creating Unforgettable Memories with Thoughtfully Curated Gifts
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#fef7c5] rounded-lg p-6 py-10 flex flex-col items-center justify-center gap-2">
          <div className="text-4xl font-bold">
            {inView && <CountUp end={5000} duration={2.5} separator="," />}+
          </div>
          <div className="font-semibold text-xl text-center">Gifts Delivered</div>
          <div className="text-center leading-5 text-gray-600">
            Thousands of smiles created worldwide
          </div>
        </div>

        <div className="bg-[#f4f4f4] rounded-lg p-6 py-10 flex flex-col items-center justify-center gap-2">
          <div className="text-4xl font-bold">
            {inView && <CountUp end={1200} duration={2} separator="," />}+
          </div>
          <div className="font-semibold text-xl text-center">Corporate Clients</div>
          <div className="text-center leading-5 text-gray-600">
            Trusted by leading global brands
          </div>
        </div>

        <div className="bg-[#fef7c5] rounded-lg p-6 py-10 flex flex-col items-center justify-center gap-2">
          <div className="text-4xl font-bold">
            {inView && <CountUp end={98} duration={2.5} />}%
          </div>
          <div className="font-semibold text-xl text-center">Happy Customers</div>
          <div className="text-center leading-5 text-gray-600">
            Satisfaction guaranteed on every order
          </div>
        </div>

        <div className="bg-[#f4f4f4] rounded-lg p-6 py-10 flex flex-col items-center justify-center gap-2">
          <div className="text-4xl font-bold">
            {inView && <CountUp end={300} duration={2} separator="," />}+
          </div>
          <div className="font-semibold text-xl text-center">Unique Gift Options</div>
          <div className="text-center leading-5 text-gray-600">
            Handpicked and customizable gift selections
          </div>
        </div>

        <div className="bg-[#fef7c5] rounded-lg p-6 py-10 flex flex-col items-center justify-center gap-2">
          <div className="text-4xl font-bold">
            {inView && <CountUp end={150} duration={2} separator="," />}+
          </div>
          <div className="font-semibold text-xl text-center">Cities Covered</div>
          <div className="text-center leading-5 text-gray-600">
            Seamless delivery across multiple locations
          </div>
        </div>

        <div className="bg-[#f4f4f4] rounded-lg p-6 py-10 flex flex-col items-center justify-center gap-2">
          <div className="text-4xl font-bold">
            {inView && <CountUp end={24} duration={2} />}x7
          </div>
          <div className="font-semibold text-xl text-center">Customer Support</div>
          <div className="text-center leading-5 text-gray-600">
            Always here to make gifting hassle-free
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
