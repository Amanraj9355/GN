import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import { ShopContext } from "./context/store";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import OAuthSuccessHandler from "./pages/OAuthSuccessHandler";
import Profile from "./pages/Profile";

const App = () => {
  const {token, isAuthVisible, setIsAuthVisible } = useContext(ShopContext);

  return (
    <div>
      <Auth isAuthVisible={isAuthVisible} setIsAuthVisible={setIsAuthVisible} />
      <Navbar />
      <Routes>
        <Route path="/oauth-success" element={<OAuthSuccessHandler />} />
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/:category/sub-category" element={<SubCategoryPage />} />
        <Route path="/product/:ProductId" element={<ProductPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
