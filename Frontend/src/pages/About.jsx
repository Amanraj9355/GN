import React from "react";
import PromoBanner from "../components/PromoBanner";
import BrandStory from "../components/BrandStory";
import FAQs from "../components/FAQs";

const About = () => {
  return (
    <div className="mt-10">
      <h2 className="text-5xl font-bold text-center">
        <span className="bg-gray-800 text-white px-2">About Us</span>
      </h2>
      <PromoBanner />
      <BrandStory />
      <FAQs />
    </div>
  );
};

export default About;
