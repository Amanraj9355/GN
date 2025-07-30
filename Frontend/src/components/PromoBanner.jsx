import React from "react";

const PromoBanner = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full px-6 md:px-0 py-10 md:py-20">
      <div className="bg-[#f7f5f0] text-black py-10 px-6 md:px-20 border-2 border-gray-300 rounded-xl max-w-6xl mx-auto relative ">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-2/3 space-y-6 ">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center md:text-start">
              WANNA KNOW US MORE ?
            </h2>
            <p className="text-md text-gray-600">
              Welcome to <span className="font-bold">GiftNation</span> 🎁 ... where gifting becomes a powerful
              expression of connection, gratitude, and brand identity. We go
              beyond the transactional, curating thoughtful, high-impact gifts
              that turn moments into lasting memories. Whether you're
              appreciating employees, delighting clients, or celebrating
              milestones, our tailored gifting solutions are designed to
              resonate. From premium hampers and branded merchandise to
              eco-conscious essentials and personalized keepsakes, every detail
              is crafted to reflect your values and vision. At GiftNation, we
              don’t just deliver gifts — we deliver emotion, strengthen
              relationships, and help your brand leave a meaningful impression.
            </p>
          </div>

          <div className="hidden md:block">
            <img
              src="/headerRight.png"
              alt="Model in trench coat"
              className="w-[40%] rounded-xl absolute -right-3 bottom-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
