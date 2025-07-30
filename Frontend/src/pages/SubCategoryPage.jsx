import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "../context/store";
import Card from "../components/Card/Card";

const categoriesData = [
  {
    category: "Electronics and Gadgets",
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
    category: "Office Essentials",
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
    category: "Drinkware",
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
    category: "Apparel",
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
    category: "Awards and Recognition",
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
    category: "Food and Beverages",
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
    category: "Eco-Friendly Products",
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
    category: "Premium Gifts",
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
    category: "Bags & Luggage",
    subCategories: [
      {
        subCategory: "Duffle Bags",
        subSubCategories: [],
      },
      {
        subCategory: "Executive Trolley Bags",
        subSubCategories: [],
      },
      {
        subCategory: "Backpack Bags",
        subSubCategories: [],
      },
      {
        subCategory: "Laptop Bags",
        subSubCategories: [],
      },
      {
        subCategory: "Sling Bags",
        subSubCategories: [],
      },
      {
        subCategory: "Fanny Packs",
        subSubCategories: [],
      },
      {
        subCategory: "Gym Bags",
        subSubCategories: [],
      },
      {
        subCategory: "Waist Pouch",
        subSubCategories: [],
      },
    ],
  },
  {
    category: "Event and Seasonal Gifts",
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

const SubCategoryPage = () => {
  const { products } = useContext(ShopContext);
  const { category } = useParams();

  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);

  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort, setSelectedSort] = useState("Sort Products By ...");

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [displayCount, setDisplayCount] = useState(8);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const categoryData = categoriesData.find(
      (cat) => cat.category === category
    );

    if (categoryData) {
      const availableSubCategories = categoryData.subCategories.filter((sub) =>
        products.some(
          (p) => p.category === category && p.subCategory === sub.subCategory
        )
      );

      setSubCategories(availableSubCategories);
      setSubSubCategories(
        availableSubCategories.flatMap((sub) => sub.subSubCategories)
      );
    }

    setSelectedSubCategory("");
    setSearchTerm("");
    setSelectedSort("Sort Products By ...");
    const initial = products.filter((p) => p.category === category);
    setFilteredProducts(initial);
    setDisplayCount(8);
  }, [category, products]);

  useEffect(() => {
    applyFilters();
  }, [selectedSubCategory, searchTerm, selectedSort]);

  useEffect(() => {
    setDisplayedProducts(filteredProducts.slice(0, displayCount));
  }, [filteredProducts, displayCount]);

  const applyFilters = () => {
    let filtered = products.filter((p) => p.category === category);

    if (selectedSubCategory) {
      filtered = filtered.filter((p) => p.subCategory === selectedSubCategory);
    }

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerSearch) ||
          (p.subCategory &&
            p.subCategory.toLowerCase().includes(lowerSearch)) ||
          (p.subSubCategory &&
            p.subSubCategory.toLowerCase().includes(lowerSearch))
      );
    }

    if (selectedSort === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "Name: A to Z") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort === "Name: Z to A") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(filtered);
    setDisplayCount(8);
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setDisplayCount(8);
  };

  const handleSortChange = (option) => {
    setSelectedSort(option);
    setDropdownOpen(false);
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 4);
  };

  return (
  <div className="my-10 flex flex-col gap-8 px-6 sm:px-0 max-w-6xl mx-auto">
    {subCategories.length === 0 ? (
      <div className="text-center text-lg text-gray-700 mt-20">
        🙏 Thank you for your response!  
        <br />We’ll be adding products soon. Please check back later.
      </div>
    ) : (
      <>
        <div className="flex flex-wrap justify-center gap-4">
          {subCategories.map((sub, idx) => {
            const image =
              products.find((p) => p.subCategory === sub.subCategory)
                ?.images[0] || "/placeholder.png";

            return (
              <div
                key={idx}
                onClick={() => handleSubCategoryClick(sub.subCategory)}
                className={`flex flex-col items-center cursor-pointer hover:scale-105 transition-transform ${
                  selectedSubCategory === sub.subCategory
                    ? "border p-1 rounded-lg border-black"
                    : ""
                }`}
              >
                <img
                  src={image}
                  alt={sub.subCategory}
                  className="rounded-full w-14 h-14 object-cover border"
                />
                <span className="text-xs mt-1 text-center">
                  {sub.subCategory}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product name, category, etc."
            className="p-2 w-full border rounded bg-white"
          />

          {/* Sorting Dropdown */}
          <div className="relative w-full">
            <div
              className="p-2 border rounded bg-white cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedSort}
            </div>
            {dropdownOpen && (
              <div className="absolute w-full bg-white border rounded mt-1 shadow z-20">
                {[
                  "Price: High to Low",
                  "Price: Low to High",
                  "Name: A to Z",
                  "Name: Z to A",
                ].map((option) => (
                  <div
                    key={option}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSortChange(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product, idx) => (
              <Link
                key={idx}
                onClick={() => scrollTo(0, 0)}
                to={`/product/${product._id}`}
              >
                <Card product={product} />
              </Link>
            ))
          ) : (
            <div className="text-center text-gray-600 mt-10">
              No products found for this selection.
            </div>
          )}
        </div>

        {displayedProducts.length < filteredProducts.length && (
          <button
            className="self-center px-6 py-2 mt-4 rounded bg-black text-white hover:bg-gray-800 transition"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
      </>
    )}
  </div>
);

};

export default SubCategoryPage;
