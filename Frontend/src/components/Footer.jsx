import React, { use, useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Instagram,
  Facebook,
  Twitter,
  Truck,
  PackageCheck,
  Copyright,
} from "lucide-react";
import { ShopContext } from "../context/store";

const Footer = () => {
  const { categoriesData } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://gift-nation.onrender.com/api/enquiry/add-enquiry",
        { email, message }
      );
      setEmail("");
      setMessage("");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full 2xl:max-w-6xl 2xl:mx-auto bg-[#111827] px-6 sm:px-10 py-8 pb-10 flex flex-col gap-4">
      <div className="top_ctr flex items-start justify-between w-full h-auto py-6 flex-wrap md:flex-nowrap">
        {/* Left Section */}
        <div className="left_ctr mb-6 sm:mb-0 w-full sm:w-3/12 flex flex-col gap-3">
          <div className="main_heading font-bold text-white text-lg">
            GiftNation
          </div>
          <div className="short_desc text-white/75 text-sm">
            Thoughtful gifting for every occasion, curated with care and
            delivered with love.
          </div>
          <div className="social_icons flex items-center gap-3 text-white/75 mt-2">
            <Instagram
              className="cursor-pointer hover:scale-110 transition-transform duration-200"
              size={20}
            />
            <Facebook
              className="cursor-pointer hover:scale-110 transition-transform duration-200"
              size={20}
            />
            <Twitter
              className="cursor-pointer hover:scale-110 transition-transform duration-200"
              size={20}
            />
          </div>
        </div>

        <div className="w-2/12 hidden sm:block"></div>

        {/* Quick Links */}
        <div className="mid_ctr w-4/12 sm:w-3/12 flex flex-col gap-2 mr-2 md:mr-0">
          <div className="font-bold text-white md:text-lg">Quick Links</div>
          {[
            "Categories",
            "About",
            "Contact",
          ].map((item,index) => (
            <Link key={index} onClick={()=>scrollTo(0,0)} to={`/${item.toLowerCase()}`}>
            <div
              key={item}
              className="cursor-pointer w-fit text-white/75 text-sm"
            >
              {item}
            </div>
            </Link>
          ))}
        </div>

        <div className="w-1/12 hidden sm:block"></div>

        {/* Categories from Data */}
        <div className="right_ctr w-7/12 md:w-6/12 flex flex-col gap-1">
          <div className="font-bold text-white md:text-lg">Categories</div>
          <div className="grid grid-cols-2 gap-x-6">
            {categoriesData.map((item) => (
              <Link
                key={item.category}
                onClick={() => scrollTo(0, 0)}
                to={`/category/${encodeURIComponent(item.category)}`}
                className="cursor-pointer w-fit text-white/75 text-sm hover:underline"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="w-1/12"></div>
      </div>

      {/* Middle Section */}
      <div className="middle_ctr py-4 border-white/10 h-auto border-t-[1px] border-b-[1px] flex items-center justify-between pr-4 sm:pr-0">
        <div className="left_ctr w-fit flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
          <div className="text-white/75 text-sm">Payment Methods: </div>
          <img
            src="/paymentMethods.png"
            alt="payment methods"
            width="80%"
            className="ml-2 cursor-pointer"
          />
        </div>
        <div className="right_ctr w-fit flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <div className="text-white/75 text-sm">Shipping Partners: </div>
          <div className="w-fit flex items-center justify-center gap-3 text-white/75 text-lg">
            <Truck className="cursor-pointer" size={20} />
            <PackageCheck className="cursor-pointer" size={20} />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom_ctr py-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
        <div className="left_ctr w-full sm:w-3/12 flex items-center justify-center sm:justify-start gap-1">
          <Copyright size={16} className="text-white/75" />
          <span className="text-white/75 text-sm">
            2025 Gift Nation. All rights reserved.
          </span>
        </div>
        <div className="right_ctr w-full sm:w-fit flex items-center justify-between sm:justify-center sm:gap-5">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
            (item) => (
              <div
                key={item}
                className="text-white/75 text-sm cursor-pointer hover:underline"
              >
                {item}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
