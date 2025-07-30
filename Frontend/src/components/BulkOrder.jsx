import React from "react";

const BulkOrder = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 bg-[#FAFAFA] py-20 px-6">
      {/* Images Section */}
      <div className="relative flex items-center">
        {/* First Image */}
        <div
                    className="rounded-t-full overflow-hidden w-52 md:w-72 h-52 md:h-72 bg-white shadow-lg -mb-10 z-20"

        >
          <img
            src="/corporate_gifting1.jpg"
            alt="Corporate Gift 1"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Second Image Overlapping */}
        <div
          className="rounded-t-full overflow-hidden w-44 md:w-68 h-44 md:h-68 bg-white shadow-lg -mt-10 -ml-10 z-10"
        >
          <img
            src="/corporate_gifting2.jpg"
            alt="Corporate Gift 2"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="text-center md:text-left max-w-lg">
        <div className="text-gray-500 text-sm uppercase tracking-wide mb-2">
          Joining Kits, Event Giveaways & More
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          Corporate Bulk Gifting
        </h2>
        <p className="text-gray-600 mb-6">
          Email at{" "}
          <a
            href="mailto:corporate@bigsmall.in"
            className="text-blue-600 font-medium"
          >
            contact@giftnation.in 
          </a>
          {' '}for any B2B gifting requirements!
        </p>
        <a
          href="/#enquiry"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md shadow hover:bg-gray-600 transition-colors"
        >
          Enquire Now
        </a>
      </div>
    </div>
  );
};

export default BulkOrder;
