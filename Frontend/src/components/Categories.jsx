import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Categories = () => {
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
  ];

  return (
    <div id="collections" className="main_ctr w-full md:max-w-6xl md:mx-auto flex items-center justify-center flex-col py-10 px-6 md:px-0 gap-6">
      <div className="text_ctr flex items-center justify-center flex-col text-center">
        <div className="heading_ctr text-4xl md:text-5xl font-semibold text-center">
          Trending Collections 🔥
        </div>
        <div className="subheading_ctr text-md mt-2">
          Curated gift sets for every occasion and person in your life.
        </div>
      </div>
      <div className="cards_ctr w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categoriesData.slice(4, 10).map((cardData, index) => (
           <Link
            key={index}
            onClick={() => scrollTo(0, 0)}
 to={`/category/${cardData.category}`}>
          <div
  className={`card group py-8 px-8 rounded-lg sm:flex flex-col gap-3 relative ${
    index % 2 == 0 ? "bg-[#efefef]" : "bg-[#fef7c5]"
  } ${index > 2 ? "hidden" : "flex"}`}
>
  <div className="font-semibold text-xl">{cardData.name}</div>
  <div className="text-md">{cardData.category}</div>
  <div className="text-sm font-semibold cursor-pointer flex items-center">
    {cardData.BtnCta}
    <ArrowRight className="ml-2 w-4 h-4" />
  </div>

  <img
    src="/headerRight.png"
    alt="gifts"
    className="hidden md:block absolute right-0 bottom-0 h-30 w-30 transition-transform duration-300 ease-in-out group-hover:rotate-24"
  />
</div>

          </Link>
        ))}
      </div>
       <Link
            onClick={() => scrollTo(0, 0)} to={"/categories"}>
        <button className="explore_btn flex items-center justify-center bg-[#111827] rounded-full text-white px-8 py-4 text-sm cursor-pointer hover:bg-[#1d283f] duration-200 ease-in-out">
          Explore Collections
          <span className="bi bi-arrow-right ml-2 flex items-center justify-center"></span>
        </button>
      </Link>
    </div>
  );
};

export default Categories;
