import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/store";
import { Trash2, MinusCircle, PlusCircle } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


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

  // ✅ PDF Download Function
const handleDownloadPDF = () => {
  const doc = new jsPDF();

  // Load logo
  const logo = new Image();
  logo.src = '/logo.png'; // Ensure this is in the "public" folder

  logo.onload = () => {
    // Add logo
    doc.addImage(logo, 'PNG', 14, 10, 50, 25);

    // Title (moved down to avoid overlap)
    doc.setFontSize(18);
    doc.text("Cart Items Summary", 140, 25);

    // Table columns
    const tableColumn = ["Product Name", "Product Code", "Category", "Price", "Qty", "Total"];
    const tableRows = [];

    cartProducts.forEach((item) => {
      tableRows.push([
        item.name,
        item.productCode,
        item.category,
        `Rs. ${item.price}`,
        item.quantity,
        `Rs. ${item.price * item.quantity}`,
      ]);
    });

    // ✅ Use autoTable with spacing
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 50, // start below logo and title
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185] },
    });

    // Total amount payable
    const totalAmount = calculateTotalAmount();
    doc.setFontSize(14);
    doc.text(`Total Amount Payable: Rs. ${totalAmount}`, 14, doc.lastAutoTable.finalY + 15);

    // Save PDF
    doc.save("Gift Nation Cart.pdf");
  };
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
            className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 rounded-full transition-all text-center block"
          >
            Download Cart Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
