import React from "react";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const backendUrl = "https://gn-7g53.onrender.com";
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

 const categoriesData = [
  {
    name: "Electronics and Gadgets",
    category: "Electronics and Gadgets",
    BtnCta: "Browse",
    subCategories: [
      {
        subCategory: "Portable Electronics",
        subSubCategories: ["Power Banks", "Bluetooth Speakers", "Earphones"],
      },
      {
        subCategory: "Home Gadgets",
        subSubCategories: ["Smart Plugs", "Air Purifiers"],
      },
      {
        subCategory: "Tech Accessories",
        subSubCategories: [
          "Charging Cables",
          "Laptop Stands",
          "Wireless Chargers",
        ],
      },
    ],
  },
  {
    name: "Office Essentials",
    category: "Office Essentials",
    BtnCta: "Shop",
    subCategories: [
      {
        subCategory: "Stationery",
        subSubCategories: ["Diaries", "Notebooks", "Sticky Notes"],
      },
      {
        subCategory: "Organizers",
        subSubCategories: ["Desk Organizers", "Calendars"],
      },
      {
        subCategory: "Writing Instruments",
        subSubCategories: ["Premium Pens", "Stylus Pens"],
      },
    ],
  },
  {
    name: "Drinkware",
    category: "Drinkware",
    BtnCta: "Grab Now",
    subCategories: [
      {
        subCategory: "Bottles",
        subSubCategories: [
          "Stainless Steel",
          "Vacuum Bottles",
          "Copper Bottles",
        ],
      },
      {
        subCategory: "Mugs and Tumblers",
        subSubCategories: ["Coffee Mugs", "Insulated Tumblers"],
      },
      {
        subCategory: "Gift Sets",
        subSubCategories: ["Bottle and Mug Combos"],
      },
    ],
  },
  {
    name: "Apparel",
    category: "Apparel",
    BtnCta: "Explore",
    subCategories: [
      {
        subCategory: "T-Shirts",
        subSubCategories: ["Polo", "Round Neck", "Custom Printed"],
      },
      {
        subCategory: "Jackets",
        subSubCategories: ["Windcheaters", "Hoodies"],
      },
      {
        subCategory: "Uniforms",
        subSubCategories: ["Corporate Branding Uniforms"],
      },
    ],
  },
  {
    name: "Awards and Recognition",
    category: "Awards and Recognition",
    BtnCta: "Discover",
    subCategories: [
      {
        subCategory: "Trophies",
        subSubCategories: ["Metal", "Crystal", "Wooden", "Acrylic"],
      },
      {
        subCategory: "Plaques",
        subSubCategories: ["Customized Engravings"],
      },
      {
        subCategory: "Certificates",
        subSubCategories: ["Certificate Frames"],
      },
    ],
  },
  {
    name: "Food and Beverages",
    category: "Food and Beverages",
    BtnCta: "Explore",
    subCategories: [
      {
        subCategory: "Gourmet",
        subSubCategories: ["Dry Fruits"],
      },
      {
        subCategory: "Sweets and Chocolates",
        subSubCategories: ["Chocolates", "Indian Sweets"],
      },
      {
        subCategory: "Gift Hampers",
        subSubCategories: ["Curated Sweets & Chocolate Hampers"],
      },
    ],
  },
  {
    name: "Eco-Friendly Products",
    category: "Eco-Friendly Products",
    BtnCta: "Go Green",
    subCategories: [
      {
        subCategory: "Reusable Items",
        subSubCategories: ["Bamboo Products", "Cloth Bags"],
      },
      {
        subCategory: "Sustainable Gifts",
        subSubCategories: ["Seed Paper Stationery", "Jute Items"],
      },
      {
        subCategory: "Green Hampers",
        subSubCategories: ["Planters", "Organic Kits"],
      },
    ],
  },
  {
    name: "Premium Gifts",
    category: "Premium Gifts",
    BtnCta: "Premium",
    subCategories: [
      {
        subCategory: "Luxury Items",
        subSubCategories: ["Branded Wallets", "Watches"],
      },
      {
        subCategory: "Designer Brands",
        subSubCategories: ["Premium Pens", "Leather Accessories"],
      },
      {
        subCategory: "High-End Combos",
        subSubCategories: ["Exclusive Hampers"],
      },
    ],
  },
  {
    name: "Bags & Luggage",
    category: "Bags & Luggage",
    BtnCta: "Shop Bags",
    subCategories: [
      { subCategory: "Duffle Bags", subSubCategories: [] },
      { subCategory: "Executive Trolley Bags", subSubCategories: [] },
      { subCategory: "Backpack Bags", subSubCategories: [] },
      { subCategory: "Laptop Bags", subSubCategories: [] },
      { subCategory: "Sling Bags", subSubCategories: [] },
      { subCategory: "Fanny Packs", subSubCategories: [] },
      { subCategory: "Gym Bags", subSubCategories: [] },
      { subCategory: "Waist Pouch", subSubCategories: [] },
    ],
  },
  {
    name: "Event and Seasonal Gifts",
    category: "Event and Seasonal Gifts",
    BtnCta: "Seasonal",
    subCategories: [
      {
        subCategory: "Festival-Specific",
        subSubCategories: [
          "Diwali Diyas",
          "Christmas Ornaments",
          "Holi Colors",
        ],
      },
      {
        subCategory: "New Year Gifts",
        subSubCategories: ["Calendars", "Year Planners", "Desk Organizers"],
      },
      {
        subCategory: "Thank-You Gifts",
        subSubCategories: ["Greeting Cards", "Custom Hampers"],
      },
    ],
  },
  {
    name: "Gift Vouchers",
    category: "Gift Vouchers",
    BtnCta: "Redeem",
    subCategories: [
      {
        subCategory: "Brand Vouchers",
        subSubCategories: [
          "Amazon",
          "Myntra",
          "Flipkart",
          "Croma",
          "Lifestyle",
        ],
      },
     {
  subCategory: "Corporate Reward Vouchers",
  subSubCategories: [
    "Employee Voucher",
    "Reward Voucher",
    "Incentives Voucher"
  ],
},

      {
        subCategory: "Occasion Vouchers",
        subSubCategories: [
          "Diwali Gifting",
          "New Year Vouchers",
          "Work Anniversary",
          "Birthday",
          "Festival & Seasonal Campaigns",
        ],
      },
      {
        subCategory: "Custom Value Vouchers",
        subSubCategories: [],
      },
    ],
  },
];


  const getUser = async () => {
    try {
      const url = `${backendUrl}/auth/login/success`;
      const response = await axios.get(url, { withCredentials: true });
      setUser(response.data.user);
      localStorage.setItem("token", response.data.user.token);
      setToken(response.data.user.token);
      navigate("/");
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const getUserProfile = async () => {
    try {
      const url = `${backendUrl}/api/user/get-profile`;
      const response = await axios.get(url, { headers: { token } });
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const updateProfile = async (data) => {
    try {
      const url = `${backendUrl}/api/user/edit-user`;
      const response = await axios.post(url, data, { headers: { token } });
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/list-product`
      );
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = async (itemId, quantity) => {
    const updatedCart = {
      ...cartItems,
      [itemId]: (cartItems[itemId] || 0) + quantity,
    };
    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add-to-cart`,
          { itemId, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error.message);
      }
    }
  };

  const updateCart = async (itemId, quantity) => {
    if (quantity < 1) return deleteCartItem(itemId);

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/update-cart`,
        { itemId, quantity },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems((prev) => ({
          ...prev,
          [itemId]: quantity,
        }));
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const deleteCartItem = async (itemId) => {
    try {
      await axios.post(
        `${backendUrl}/api/cart/delete-cart`,
        { itemId },
        { headers: { token } }
      );

      setCartItems((prev) => {
        const newCart = { ...prev };
        delete newCart[itemId];
        return newCart;
      });
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const getUserCart = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get-cart`,
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const addToWishlist = async (itemId) => {
    if (!token) return;

    try {
      await axios.post(
        `${backendUrl}/api/wishlist/add-to-wishlist`,
        { itemId }, // ✅ only itemId is required
        { headers: { token } }
      );

      setCartItems((prev) => ({ ...prev, [itemId]: true }));
    } catch (error) {
      console.error("Error adding to wishlist:", error.message);
    }
  };

  const deleteFromWishlist = async (itemId) => {
    if (!token) return;

    try {
      await axios.post(
        `${backendUrl}/api/wishlist/delete-wishlist`,
        { itemId },
        { headers: { token } }
      );

      setCartItems((prev) => {
        const newWishlist = { ...prev };
        delete newWishlist[itemId];
        return newWishlist;
      });
    } catch (error) {
      console.error("Error deleting wishlist item:", error.message);
    }
  };

  const getUserWishlist = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/wishlist/get-wishlist`,
        {},
        { headers: { token } }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching wishlist data:", error.message);
    }
  };

  const getCartCount = () => Object.keys(cartItems).length;

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    if (token) getUserCart();
  }, [token]);

  useEffect(() => {
    getData();
  }, []);

  const value = {
    backendUrl,
    token,
    setToken,
    products,
    cartItems,
    addToCart,
    deleteCartItem,
    getCartCount,
    updateCart,
    getUserCart,
    isAuthVisible,
    setIsAuthVisible,
    categoriesData,
    logOut,
    getUserProfile,
    updateProfile,
    addToWishlist,
    deleteFromWishlist,
    getUserWishlist,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
