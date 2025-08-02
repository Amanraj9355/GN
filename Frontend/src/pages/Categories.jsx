import React, { useContext } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/store";


const emotes = ["🎁", "🎉", "📦", "💼", "🛍️", "🎂", "🍫", "💳", "🎊", "🎀", "🎟️"];

const ctas = [
  "Shop Now",
  "Explore",
  "Grab Yours",
  "Limited Offer",
  "View More",
  "Unwrap Joy",
  "Treat Yourself",
  "Discover Deals",
  "Let’s Go!",
  "Don't Miss Out",
];

const Categories = () => {
  const {categoriesData} = useContext(ShopContext)
  return (
    <div className="flex items-center justify-center flex-col py-10 px-6 md:px-0 gap-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-center flex-col">
        <h2 className="text-4xl md:text-5xl font-bold text-center ">
          <span className="text-5xl bg-gray-800 text-white p-1 inline-block mb-3 md:text-black md:bg-white md:p-0">
            Discover All
          </span>{" "}
          <span className="md:bg-gray-800  md:px-2 md:text-white">
            Categories
          </span>
        </h2>
        <p className="text-xl mt-2 text-center text-gray-600">
          There’s no section left-out 🎁
        </p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categoriesData.map((categoryData, index) => (
          <Link
            key={index}
            onClick={() => scrollTo(0, 0)} to={`/category/${categoryData?.category}`}>
            <div
              key={index}
              className={`relative p-5 rounded-2xl flex justify-between items-start min-h-[200px] ${
                index % 2 === 0 ? "bg-[#efefef]" : "bg-[#fff3c2]"
              } hover:shadow-xl hover:scale-[1.03] transition-all duration-300 group`}
            >
              {/* Text Content */}
              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-2xl text-gray-900">{categoryData?.category}</h3>
                <p className="text-base text-gray-700">
                  {ctas[index % ctas.length]} your favorite items now.
                </p>
                <div className="text-base font-medium text-[#111827] flex items-center gap-1 group-hover:underline cursor-pointer">
                  {ctas[index % ctas.length]} <ArrowRight size={18} />
                </div>
              </div>

              {/* Emoji */}
              <div className="absolute bottom-6 right-5 -rotate-16 text-6xl md:text-7xl">
                {emotes[index % emotes.length]}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
