import React, { useContext } from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Categories from "../components/Categories";
import CtaBanner from "../components/CtaBanner";
import GiftFinder from "../components/GiftFinder";
import Testimonials from "../components/Testimonials";
import NewsLetter from "../components/NewsLetter";
import Statistics from "../components/Statistics";
import QueryForm from "../components/QueryForm";
import LabelledSection from "../components/LabelledSection/LabelledSection";
import { ShopContext } from "../context/store";
import BulkOrder from "../components/BulkOrder";
import Carousel from "../components/Carousel";
import ImageBanner from "../components/ImageBanner";

const Home = () => {
  const { products } = useContext(ShopContext);

  const topProducts = products.slice(8, 12);
  const lowProducts = products.slice(28, 31);
  const midProducts = products.slice(52, 55);
  const randomProducts = products.slice(39, 43);

  return (
    <div className="overflow-hidden">
      <HeroSection />
      <Features />
      <Carousel/>
      <Categories />
      <LabelledSection label="Trending Picks ⚡️" products={topProducts} />
      <ImageBanner/>
      <GiftFinder />
      <LabelledSection label="Most Loved ❤️" products={randomProducts} />
      <CtaBanner />
      <Testimonials />
      <NewsLetter />
      <Statistics />
      <QueryForm />
      <BulkOrder/>
    </div>
  );
};

export default Home;
