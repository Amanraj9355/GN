import React, { useContext, useState } from "react";
import { Send } from "lucide-react";
import { ShopContext } from "../context/store";
import { Link, useNavigate } from "react-router-dom";

const GiftFinder = () => {
  const [message, setMessage] = useState("Start the Search");
  const [isSearching, setIsSearching] = useState(false);
  const [value, setValue] = useState(1500);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [suggestedGifts, setSuggestedGifts] = useState([]);

  const navigate = useNavigate();
  const { products } = useContext(ShopContext);

  // ✅ Hardcoded categories
  const giftOptions = [
    "Office Essentials",
    "Drinkware",
    "Eco-Friendly Products",
    "Premium Gifts",
    "Bags & Luggage",
    "Event and Seasonal Gifts",
  ];

  // ✅ Get random products under selected price
  const getRandomProducts = (category, maxPrice) => {
    const filtered = products.filter(
      (p) => p.category === category && p.price <= maxPrice
    );
    return filtered.sort(() => 0.5 - Math.random()).slice(0, 4);
  };

  // ✅ Only select category here (don't fetch gifts yet)
  const handleCategoryClick = (option) => {
    setSelectedCategory(option);
    setMessage("Category selected ✅, click the arrow to search");
  };

  // ✅ Fetch gifts only on arrow click
  const handleSendClick = () => {
    if (isSearching || !selectedCategory) return;

    setIsSearching(true);
    setSuggestedGifts([]);
    setMessage("Searching...");

    const messages = [
      "Looking for the best gift 🎁",
      "Searching the inventory 🔍",
      "Almost there ⏳",
    ];

    let index = 0;

    const interval = setInterval(() => {
      setMessage(messages[index]);
      index++;

      if (index === messages.length) {
        clearInterval(interval);
        setMessage("Search Complete ✅");

        const gifts = getRandomProducts(selectedCategory, value);
        setSuggestedGifts(gifts);
        console.log("Gifts", gifts);
        setIsSearching(false);
      }
    }, 1500);
  };

  return (
    <div id="giftfinder" className="flex justify-center items-center px-6" >
      <div className="main_ctr sm:min-h-[500px] min-h-lvh my-12 sm:px-16 sm:py-2 px-6 py-8 bg-[#efefef] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 w-full md:max-w-6xl md:mx-auto">
        {/* Left Section */}
        <div className="sm:w-6/12 flex flex-col gap-6">
          <div className="title_ctr">
            <h2 className="font-bold text-2xl sm:text-3xl">
              Find the Perfect Gift
            </h2>
            <p className="sm:text-md text-sm mt-4 sm:mt-0 text-gray-700">
              Answer a few questions and let our gift finder do the magic.
              Personalized recommendations based on your preferences.
            </p>
          </div>

          {/* Price Range */}
          <div className="opts_ctr flex flex-col gap-6">
            <div>
              <div className="font-bold text-lg flex items-center gap-2">
                Price Range
                <div className="bg-[#111827] text-white px-2 rounded-sm text-sm">
                  ₹{value}
                </div>
              </div>
              <div className="w-full max-w-md">
                <input
                  type="range"
                  min="500"
                  max="2500"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="w-[90%] h-2 rounded-lg appearance-none cursor-pointer bg-gray-600"
                />
                <div className="w-[90%] flex items-center justify-between text-xs mt-1 text-gray-600">
                  <span>₹500</span>
                  <span>₹2500</span>
                </div>
              </div>
            </div>

            {/* Category Options */}
            <div className="occasion_ctr flex flex-col gap-2">
              <div className="font-bold text-lg">Options</div>
              <div className="options flex flex-wrap gap-3">
                {giftOptions.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleCategoryClick(option)}
                    className={`sm:text-sm text-xs rounded-full px-4 py-2 cursor-pointer transition duration-200 ${
                      selectedCategory === option
                        ? "bg-[#111827] text-white"
                        : "bg-[#E0E0E0] hover:bg-[#111827] hover:text-white"
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="sm:w-5/12 w-full flex flex-col items-center justify-center gap-4 sm:py-16 py-0 sm:mt-0">
          <div className="grid grid-cols-2 gap-4 w-full">
            {suggestedGifts.length > 0 ? (
              suggestedGifts.map((gift) => (
                <Link key={gift._id} onClick={()=>scrollTo(0,0)} to={`/product/${gift._id}`}>
                <div
                  className="bg-white rounded-xl shadow-md px-2 py-6 flex items-center justify-center cursor-pointer hover:shadow-lg transition"
                >
                  <img
                    src={gift.images?.[0] || "/GiftFinderLoader.png"}
                    alt={gift.name}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                </Link>
              ))
            ) : (
              [...Array(4)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md px-4 py-10 flex items-center justify-center"
                >
                  <img
                    src="/GiftFinderLoader.png"
                    alt="Gift Finder Loader"
                    className={`max-w-[30%] ${isSearching ? "animate-pulse" : ""}`}
                  />
                </div>
              ))
            )}
          </div>

          {/* Message + Send Button */}
          <div className="flex items-center justify-between w-full gap-2">
            <div className="w-10/12 px-4 py-2 text-sm border border-black rounded-md bg-white shadow-sm text-center">
              {message}
            </div>
            <button
              onClick={handleSendClick}
              disabled={isSearching || !selectedCategory}
              className={`w-2/12 p-3 flex items-center justify-center rounded-md shadow-sm transition duration-300 ${
                isSearching || !selectedCategory
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#111827] hover:bg-[#1f2937]"
              }`}
            >
              <Send className="text-white w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftFinder;
