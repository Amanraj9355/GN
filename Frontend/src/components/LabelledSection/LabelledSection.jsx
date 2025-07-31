import React from "react";
import Card from "../Card/Card.jsx";
import "./LabelledSection.css";
import { Link } from "react-router-dom";

const LabelledSection = ({ label, products }) => {
  return (
    <div className=" w-full md:max-w-6xl md:mx-auto flex items-center justify-between flex-col py-10 px-6 md:px-0 gap-6">
      <div className=" flex items-center justify-center flex-col">
        <div className="text-4xl md:text-5xl font-semibold text-center">
          {label}
        </div>
        <div className=" text-md mt-2 text-center">
          Discover what's capturing hearts this season
        </div>
      </div>
      <div className="w-full md:max-w-6xl md:mx-auto flex flex-col gap-5 md:flex-row items-center justify-between">
        {products.map((product, index) => {
          return (
            
             <Link
            key={index}
            onClick={() => scrollTo(0, 0)} to={`/product/${product._id}`}>
              <Card product={product} />
            </Link>
          );
        })}

      </div>
       <Link
            onClick={() => scrollTo(0, 0)} to={'/categories'}>
      <div className=" flex items-center justify-center bg-[#e0e0e0] rounded-full font-semibold px-8 py-4 text-sm cursor-pointer hover:bg-[#d4d4d4] duration-200 ease-in-out -mt-6 sm:mt-0">
        View All Gifts
      </div>
      </Link>
    </div>
  );
};

export default LabelledSection;
