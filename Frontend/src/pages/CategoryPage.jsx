import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../components/Card/Card";
import { ShopContext } from "../context/store";
import { Plus, XCircle, ArrowRight, ChevronRight } from "lucide-react";

const cardimgarr = [
  "/headerRight.png",
  "/headerRight.png",
  "/headerRight.png",
  "/headerRight.png",
  "/headerRight.png",
  "/headerRight.png",
];

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [clickedCard, setClickedCard] = useState(false);
  const [data, setData] = useState("");
  const { categoriesData, products } = useContext(ShopContext);

  const cardClicked = (subCat) => {
    setClickedCard(!clickedCard);
    setData(subCat);
  };

  const categoryData = categoriesData.find(
    (cat) => cat.category === decodeURIComponent(categoryName)
  );

  if (!categoryData) {
    return <div className="text-center text-xl mt-10">Category not found</div>;
  }

  const topPicks = products.filter((item) => item.category === categoryName);

  return (
    <div className=" my-10 flex items-center justify-center flex-col gap-12 px-2 sm:px-16 w-full text-[#111827] relative">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-2 bg-gray-800 text-white p-2">
          Explore {categoryData.category}
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Find the best items in this category.
        </p>
      </div>
      <div className="w-full flex justify-center items-center">
        {/* Banner Video */}
        <div className="mx-6 w-full rounded-xl border-2 border-[#111827] overflow-hidden shadow-lg">
          <video
            src="/videoBanner.mp4"
            autoPlay
            muted
            loop
            className="h-[400px] w-full object-cover"
          ></video>
        </div>
      </div>

      {/* SubCategory Cards */}
      <div className="text-center space-y-2 w-full">
        <h2 className="text-4xl font-bold flex items-center justify-center gap-2">
          Explore Subcategories
        </h2>
        <p className="text-gray-700 text-lg">Dive into curated product types</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-2 px-4 md:px-0 max-w-6xl mx-auto">
        {categoryData.subCategories.slice(0, 3).map((sub, index) => (
          <div
            key={index}
            className="group transition-all hover:scale-[1.02] duration-300 flex flex-col justify-between bg-gradient-to-br from-gray-100 to-white shadow-md hover:shadow-xl rounded-2xl border border-black overflow-hidden p-6 min-h-[400px]"
          >
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-[#111827]">
                {sub.subCategory}
              </div>
              <div className="text-base text-gray-600">
                {sub.subSubCategories.slice(0, 4).join(", ") ||
                  "Various Products"}
              </div>
            </div>

            <div className="flex items-center justify-center h-[200px] my-4">
              <img
                src={cardimgarr[index]}
                className="w-68 h-68 object-contain transition-transform group-hover:rotate-26"
                alt={sub.subCategory}
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => cardClicked(sub.subCategory)}
                className="text-[#111827] bg-white border border-gray-300 p-2 rounded-full shadow hover:bg-black hover:text-white transition"
              >
                <Plus size={26} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Link
        onClick={() => scrollTo(0, 0)}
        to={`/${categoryName}/sub-category`}
        className="explore_btn flex items-center gap-2 justify-center bg-black text-white rounded-full font-semibold px-8 py-3 text-sm hover:bg-gray-900 transition"
      >
        View All Sub Categories <ChevronRight />
      </Link>

      {/* Popup Modal */}
      {clickedCard && (
        <div className="fixed top-0 left-0 z-50 h-full w-full bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-3xl text-center relative">
            <button
              onClick={() => cardClicked("closed")}
              className="absolute top-4 right-4 text-gray-800 hover:text-red-500"
            >
              <XCircle size={28} />
            </button>
            <h2 className="text-3xl font-bold text-[#111827]">{data}</h2>
            <p className="text-gray-600 mt-2 mb-6">
              Curated gift sets for every occasion.
            </p>
            <img
              src="/CtaBannerImg.png"
              className="w-full h-[250px] object-contain rounded-xl"
              alt="Gift Banner"
            />
            <Link
              onClick={() => scrollTo(0, 0)}
              to={`/${categoryName}/sub-category`}
            >
              <button className="mt-6 bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 mx-auto hover:bg-gray-800 transition">
                View All Gifts <ArrowRight />
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Top Picks */}
      {topPicks.length > 0 && (
        <div className="w-full">
          <div className="text-center space-y-5 pt-10">
            <h2 className="text-4xl font-semibold">
              Top Items in {categoryData.category}
            </h2>
            <p className="text-gray-700">Discover what's trending ✨</p>
          </div>

          <div className="w-full flex flex-wrap md:flex-nowrap gap-6 items-center justify-center px-4 max-w-6xl mx-auto py-5">
            {topPicks.slice(0, 4).map((product) => (
              <Link
                key={product._id}
                onClick={() => scrollTo(0, 0)}
                to={`/product/${product._id}`}
              >
                <Card product={product} />
              </Link>
            ))}
          </div>
          <div className="w-full flex justify-center items-center">
            <Link
              onClick={() => scrollTo(0, 0)}
              to={`/${categoryName}/sub-category`}
              className="explore_btn flex items-center gap-2 justify-center bg-black text-white rounded-full font-semibold px-8 py-3 text-sm hover:bg-gray-900 transition mt-6"
            >
              View All Gifts <ArrowRight />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
