import React, { useContext, useState } from "react";
import { Heart, HeartOff, ShoppingCart, Check } from "lucide-react";
import "./Cardstyle.css";
import { ShopContext } from "../../context/store";

const Card = ({ product }) => {
  const { token, isAuthVisible, setIsAuthVisible, addToCart, addToWishlist } = useContext(ShopContext);
  const [isHeart, setIsHeart] = useState(false);
  const [isAdded, setIsAdded] = useState(false);


// ✅ Handle wishlist toggle
const toggleHeart = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (!token) {
    setIsAuthVisible(true);
    return;
  };

  try {
    await addToWishlist(product._id);
    setIsHeart((prev) => !prev);
  } catch (error) {
    console.error("Error toggling wishlist:", error.message);
  }
};

// ✅ Handle Add to Cart
const handleAddToCart = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (!token) {
    setIsAuthVisible(true)
    return;
  };

  try {
    await addToCart(product._id, 1);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  } catch (error) {
    console.error("Error adding to cart:", error.message);
  }
};


  return (
    <div className="card p-4 rounded-2xl bg-[#e0e0e0] sm:h-[325px] sm:w-[90%] md:h-[325px] md:w-[270px] h-[180px] flex md:flex-col gap-4 w-full shadow-lg transition-transform duration-300 hover:scale-[1.02] border border-gray-400">
      <div className="img_ctr bg-white rounded-xl h-full md:h-[55%] relative w-6/12 md:w-full flex justify-center items-center">
        <img
          className="h-60 w-60 md:h-full md:w-full object-contain md:object-cover rounded-md"
          src={product.images?.[0] || ""}
          alt={product.name || "Product Image"}
        />

        {/* ✅ Wishlist button */}
        <div
          className={`absolute right-2 top-2 p-[6px] rounded-full cursor-pointer border transition-all ${
            isHeart
              ? "bg-red-600 text-white animate-bounce"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          onClick={toggleHeart}
          title={isHeart ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isHeart ? <HeartOff size={18} /> : <Heart size={18} />}
        </div>
      </div>

      <div className="w-6/12 md:w-full flex flex-col justify-between md:mt-2">
        <div className="desc_ctr w-full flex flex-col md:flex-row gap-2 md:gap-0 items-start md:items-center justify-between md:mb-6">
          <div className="right_ctr flex flex-col gap-1 md:gap-2 w-full">
            <p className="text-xs sm:text-xl md:text-xs text-gray-600">
              {product.category || "Category"}
            </p>
            <h3 className="font-semibold text-lg sm:text-3xl md:text-lg leading-5 md:leading-none">
              {product.name || "Product Name"}
            </h3>
          </div>
          <div className="left_ctr flex flex-col items-start md:items-end">
            <p className="text-xs sm:text-xl md:text-xs line-through text-gray-500">
              ₹1500
            </p>
            <p
              className={`font-semibold text-lg sm:text-3xl md:text-lg -mt-1 ${
                !token ? "blur-sm" : "blur-none"
              }`}
            >
              ₹{product.price || "1234"}
            </p>
          </div>
        </div>

        {/* ✅ Add to cart button */}
        <div
          className={`btn_ctr flex items-center justify-center text-white rounded-full px-4 md:px-8 py-2 text-xs sm:text-lg md:text-sm cursor-pointer transition-all duration-200 mb-3 ${
            isAdded
              ? "bg-green-600 hover:bg-green-700"
              : "bg-[#111827] hover:bg-[#1d283f]"
          }`}
          onClick={handleAddToCart}
        >
          {isAdded ? (
            <div className="flex items-center gap-2 animate-fade-in">
              <Check size={18} /> Added
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ShoppingCart size={18} /> Add to Cart
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
