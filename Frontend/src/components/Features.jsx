import React from "react";
import { Truck, Coffee,Gift,ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-6 h-6 text-white" />,
    title: "Global Shipping",
    description: "We globally ship to our clients",
    bg: "bg-green-400",
  },
  {
    icon: <Coffee className="w-6 h-6 text-white" />,
    title: "Quality Customization",
    description: "Quality customization on all products",
    bg: "bg-red-400",
  },
  {
    icon: <Gift className="w-6 h-6 text-white" />,
    title: "Best Quality Products",
    description: "We stock some of the best brands",
    bg: "bg-yellow-400",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    title: "Secure Packaging",
    description: "Ensuring safety in every shipment",
    bg: "bg-blue-400",
  },
];


const Features = () => {
  return (
    <div className="flex flex-wrap sm:flex-nowrap items-stretch justify-between gap-6 w-full md:max-w-6xl md:mx-auto px-6 md:px-0 py-20 text-[#111827]">
      {features.map((item, idx) => (
        <div
          key={idx}
          className="w-full sm:w-4/12 bg-[#f9f9f9] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className={`rounded-full p-3 ${item.bg} shadow-md`}>
            {item.icon}
          </div>
          <div className="font-semibold text-xl text-center">{item.title}</div>
          <div className="text-center text-sm text-gray-600">{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Features;
