import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/store";
import { Trash2, MinusCircle, PlusCircle } from "lucide-react";
import jsPDF from "jspdf";

const Cart = () => {
  const { cartItems, products, deleteCartItem, updateCart, getUserCart } =
    useContext(ShopContext);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    getUserCart();
  }, []);

  useEffect(() => {
    if (!cartItems || products.length === 0) return;
    const updatedCartProducts = Object.keys(cartItems)
      .map((id) => {
        const product = products.find((prod) => prod._id === id);
        if (!product) return null;
        return { ...product, quantity: cartItems[id].quantity };
      })
      .filter(Boolean);
    setCartProducts(updatedCartProducts);
  }, [cartItems, products]);

  const handlePlusQty = (id, quantity) => {
    setCartProducts((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
    updateCart(id, quantity).then(() => getUserCart());
  };

  const handleMinusQty = (id, quantity) => {
    if (quantity > 0) {
      setCartProducts((prev) =>
        prev.map((item) => (item._id === id ? { ...item, quantity } : item))
      );
      updateCart(id, quantity).then(() => getUserCart());
    }
  };

  const calculateTotalAmount = () =>
    cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleDownloadPDF = async () => {
    if (!cartProducts || cartProducts.length === 0) return;

    const doc = new jsPDF("p", "pt", "a4");
    let y = 40;

    // ✅ Load logo first
    const logo = await loadImage("/logo.png");
    if (logo) {
      doc.addImage(logo, "PNG", 40, 20, 90, 45);

      // Title (aligned right of logo)
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(33, 37, 41);
      doc.text("Cart Items Summary", 390, 50);
      y += 40;
    }

    // ✅ Loop through products
    for (let i = 0; i < cartProducts.length; i++) {
      const item = cartProducts[i];
      if (!item || !item._id) continue;

      y += 30;

      // Load product image
      const image = await loadImage(item.images[0]);
      if (image) {
        doc.addImage(image, "JPEG", 40, y, 80, 80);
      }

      const textX = 130;
      const textY = y + 15;

      // Product name with hyperlink
      doc.setFontSize(14);
      doc.setTextColor(0, 102, 204);
      doc.textWithLink(item.name, textX, textY, {
        url: `${window.location.origin}/product/${item._id}`,
      });

      // Other details
      doc.setFontSize(11);
      doc.setTextColor(80);
      doc.text(`Product Code: ${item.productCode}`, textX, textY + 15);
      doc.text(`Category: ${item.category}`, textX, textY + 30);
      doc.text(`Price: Rs ${item.price}`, textX, textY + 45);
      doc.text(`Quantity: ${item.quantity}`, textX, textY + 60);
      doc.text(`Total: Rs ${item.price * item.quantity}`, textX, textY + 75);

      // Divider line
      y += 110;
      doc.setDrawColor(220);
      doc.line(40, y, 555, y);

      // Page overflow
      if (y > 700 && i < cartProducts.length - 1) {
        doc.addPage();
        y = 40;
      }
    }

    // ✅ Total amount
    y += 30;
    doc.setFontSize(14);
    doc.setTextColor(20);
    doc.text(`Total Amount Payable: Rs ${calculateTotalAmount()}`, 40, y);

    // ✅ Save file
    doc.save("Gift Nation Cart.pdf");
  };

  // ✅ Utility function to load images
  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  };

  if (Object.keys(cartItems).length === 0) {
    return (
      <div className="w-full py-10 flex flex-col items-center justify-center gap-6 px-4 text-center">
        <img
          src="/EmptyCart.png"
          alt="Empty Cart"
          className="w-4/5 sm:w-2/5 md:w-1/5"
        />
        <h2 className="text-3xl sm:text-4xl font-bold">Your Cart is Empty</h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-md">
          Start adding some items to your cart and make your loved ones happy!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            onClick={() => scrollTo(0, 0)}
            to="/"
            className="bg-black text-white px-6 py-3 rounded-full text-sm sm:text-base hover:bg-gray-800 transition"
          >
            Explore Collections
          </Link>
          <Link
            to="/wishlist"
            className="bg-gray-300 text-black px-6 py-3 rounded-full text-sm sm:text-base hover:bg-red-600 hover:text-white transition"
          >
            Visit Wishlist
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6 md:p-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {cartProducts.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center p-6 gap-6 hover:shadow-2xl transition-shadow relative"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full md:w-32 h-32 rounded-xl object-cover border "
              />
              <div className="flex-1 w-full">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">
                      {item.category}
                    </p>
                    <h2 className="text-xl font-bold text-gray-800">
                      {item.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => deleteCartItem(item._id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-semibold bg-gray-800 text-white px-2">
                    ₹{item.price}
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                    <button
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      onClick={() =>
                        handleMinusQty(item._id, item.quantity - 1)
                      }
                    >
                      <MinusCircle size={22} />
                    </button>
                    <span className="px-4 font-medium text-lg">
                      {item.quantity}
                    </span>
                    <button
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      onClick={() => handlePlusQty(item._id, item.quantity + 1)}
                    >
                      <PlusCircle size={22} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-8 h-fit space-y-6">
          <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
          <div className="space-y-2 text-sm text-gray-600">
            {cartProducts.map((item) => (
              <div key={item._id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <hr />
          <div className="flex justify-between font-semibold text-gray-800 text-lg">
            <span>Total Amount Payable</span>
            <span>₹{calculateTotalAmount()}</span>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="cursor-pointer w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 rounded-full transition-all text-center block"
          >
            Download Cart Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
