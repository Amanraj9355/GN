import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/store";
import { Trash2 } from "lucide-react";

const Wishlist = () => {
  const { products, deleteFromWishlist, getUserWishlist } =
    useContext(ShopContext);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const data = await getUserWishlist();

      if (data && typeof data === "object" && data.wishlistData) {
        const productIds = Object.keys(data.wishlistData);
        const filteredProducts = products.filter((p) =>
          productIds.includes(p._id)
        );
        setWishlistProducts(filteredProducts);
      } else {
        setWishlistProducts([]);
      }
    };

    fetchWishlist();
  }, [products]);

  // ✅ Handle delete and update UI immediately
  const handleDelete = async (id) => {
    await deleteFromWishlist(id);
    setWishlistProducts((prev) => prev.filter((item) => item._id !== id));
  };

  if (!Array.isArray(wishlistProducts) || wishlistProducts.length === 0) {
    return (
      <div className="w-full py-10 flex flex-col items-center justify-center gap-6 px-4 text-center">
        <img
          src="/EmptyWishlist.png"
          alt="Empty Wishlist"
          className="w-4/5 sm:w-2/5 md:w-1/6"
        />
        <h2 className="text-3xl sm:text-4xl font-bold">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-md">
          Start adding some items to your favourites and make your loved ones
          happy!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            onClick={() => scrollTo(0, 0)}
            to="/"
            className="bg-black text-white px-6 py-3 rounded-full text-sm sm:text-base hover:bg-gray-800 transition"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-6 md:p-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {wishlistProducts.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden flex flex-col items-center p-5 gap-4 transition-transform duration-300 hover:scale-[1.02] relative"
          >
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-full h-52 rounded-xl object-cover border"
            />
            <div className="flex-1 w-full">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">
                    {item.category}
                  </p>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>
                </div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-gray-400 hover:text-red-500"
                  title="Remove from Wishlist"
                >
                  <Trash2 size={22} />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-semibold bg-gray-800 text-white px-3 py-1 rounded-md">
                  ₹{item.price}
                </span>
                <Link
                  key={item._id}
                  onClick={() => scrollTo(0, 0)}
                  to={`/product/${item._id}`}
                >
                  <div className="text-lg font-semibold bg-gray-800 text-white px-3 py-1 rounded-md">
                    Browse
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          onClick={() => scrollTo(0, 0)}
          to="/"
          className="bg-black text-white px-8 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition"
        >
          Explore New Collections
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
