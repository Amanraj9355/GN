import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "../context/store";
import Card from "../components/Card/Card";
import {
  Heart,
  HeartOff,
  Minus,
  Plus,
  ShoppingCart,
  Check,
  BadgePercent,
  Leaf,
  Truck,
  ShieldCheck,
  Star,
  Sparkles,
} from "lucide-react";

const features = [
  { name: "Eco-Friendly", icon: Leaf },
  { name: "Fast Delivery", icon: Truck },
  { name: "Satisfaction ", icon: ShieldCheck },
  { name: "Premium ", icon: Star },
  { name: "Thoughtful ", icon: Sparkles },
];

const ProductPage = () => {
  const {
    products,
    token,
    isAuthVisible,
    setIsAuthVisible,
    addToCart,
    addToWishlist,
  } = useContext(ShopContext);
  const [isHeart, setIsHeart] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [currQty, setCurrQty] = useState(1);
  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { ProductId } = useParams();

  const handleMinusQty = () => {
    if (currQty > 1) setCurrQty(currQty - 1);
  };

  const handlePlusQty = () => {
    setCurrQty(currQty + 1);
  };

  const toggleHeart = async (e) => {
    if (!token) {
      setIsAuthVisible(true);
      return;
    }

    try {
      await addToWishlist(product._id);
      setIsHeart(true);

      // Reset heart icon after 1.5 seconds
      setTimeout(() => {
        setIsHeart(false);
      }, 1500);
    } catch (error) {
      console.error("Error toggling wishlist:", error.message);
    }
  };

  const handleAddToCart = () => {
    try {
      if (!token) {
        setIsAuthVisible(true);
        return;
      }
      addToCart(product._id, currQty);
      setIsAdded(true);

      // Reset button state after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const productData = products.find((prod) => prod._id === ProductId);
    if (productData) {
      setProduct(productData);
      setMainImg(productData.images?.[0] || "");
      setSubCategory(productData.subCategory);
    } else {
      setProduct(null);
    }
  }, [products, ProductId]);

  useEffect(() => {
    const prods = products.filter((prod) => prod.subCategory === subCategory && prod._id !== ProductId);
    setRelatedProducts(prods.slice(0, 4));
  }, [product, ProductId]);

  if (!product) {
    return <div className="text-center mt-20">Product not found!</div>;
  }

  return (
    <div className="main_ctr w-full my-10 px-6 md:px-0 flex flex-col gap-10 max-w-6xl mx-auto">
      {/* Upper Section */}
      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* Left: Images */}
        <div className="w-full md:w-6/12">
          <div className="rounded-lg overflow-hidden border border-gray-300">
            <img
              src={mainImg}
              alt={product.name}
              className="w-full md:h-[400px] object-fit"
            />
          </div>
          <div className="mt-4 flex gap-4">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className={`w-24 h-24 rounded-lg object-cover cursor-pointer border ${
                  mainImg === img ? "border-black" : "border-transparent"
                }`}
                onClick={() => setMainImg(img)}
              />
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-6/12 flex flex-col gap-4">
          <div>
            <h2 className="text-4xl font-bold">{product.name}</h2>
            <p className="text-gray-600 mt-2">
              {product.shortDescription ||
                "Thoughtfully crafted to delight, surprise, and bring a lasting smile to your loved one’s face because every gift should feel truly special."}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between items-start justify-start border-y py-6 gap-6">
            {/* Price Info */}
            <div className="flex flex-col gap-2 md:w-1/3">
              <div className="line-through text-gray-500">₹1234</div>
              <div className="text-3xl font-bold text-black">
                ₹{product.price}
              </div>
              {product.discount > 0 && (
                <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                  <BadgePercent className="w-4 h-4" />
                  {product.discount}% Off
                </div>
              )}
            </div>

            {/* Quantity + Wishlist */}
            <div className="flex flex-col gap-3 w-full md:w-2/3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <button
                    onClick={handleMinusQty}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus />
                  </button>
                  <span className="px-4">{currQty}</span>
                  <button
                    onClick={handlePlusQty}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus />
                  </button>
                </div>
                <button
                  onClick={toggleHeart}
                  className={`rounded-full border border-gray-300 p-2 transition-all duration-300 ${
                    isHeart ? "bg-red-500 text-white" : "text-gray-600"
                  }`}
                >
                  {isHeart ? <Heart /> : <HeartOff />}
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-full transition-all duration-200 ${
                  isAdded ? "bg-green-600" : "bg-black hover:bg-gray-800"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={18} /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-4 ">
            {features.map(({ name, icon: Icon }, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-start md:justify-center gap-2"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Icon className="h-5 w-5 text-gray-600" />
                </div>
                <p className="text-sm text-center text-gray-700">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="border-t border-b py-10">
        <h3 className="text-2xl font-semibold mb-4">Description</h3>
        <p className="text-gray-700">
          {product.description || "No description available."}
        </p>
      </div>

      {/* Related Products */}
      <div className="py-6">
        <h3 className="text-3xl font-semibold mb-6">Customers Also Buy...</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((prod, idx) => (
            <Link
              onClick={() => scrollTo(0, 0)}
              key={idx}
              to={`/product/${prod._id}`}
            >
              <Card product={prod} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
