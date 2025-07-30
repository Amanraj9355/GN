import React from "react";
import Marquee from "react-fast-marquee";

const testimonials = [
  {
    name: "Aarav Sharma",
    profilePic: "https://randomuser.me/api/portraits/men/14.jpg",
    rating: 5,
    purchasedItem: "Customized Coffee Mug",
    review: "Beautifully printed and delivered right on time. My friend loved it!",
  },
  {
    name: "Priya Nair",
    profilePic: "https://randomuser.me/api/portraits/women/64.jpg",
    rating: 4,
    purchasedItem: "Photo Frame Combo",
    review: "Quality was excellent and packaging was neat. Perfect anniversary gift!",
  },
  {
    name: "Rohan Verma",
    profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5,
    purchasedItem: "Wireless Charger Gift Set",
    review: "Sleek design and super handy. A practical gift option for colleagues.",
  },
  {
    name: "Ishita Kapoor",
    profilePic: "https://randomuser.me/api/portraits/women/40.jpg",
    rating: 5,
    purchasedItem: "Chocolate Gift Hamper",
    review: "Absolutely delicious and beautifully arranged. A hit at the party!",
  },
  {
    name: "Devansh Khanna",
    profilePic: "https://randomuser.me/api/portraits/men/33.jpg",
    rating: 5,
    purchasedItem: "Luxury Pen Set",
    review: "Elegant and classy gift. My boss was very impressed.",
  },
  {
    name: "Meera Joshi",
    profilePic: "https://randomuser.me/api/portraits/women/42.jpg",
    rating: 4,
    purchasedItem: "Handmade Scented Candles",
    review: "Fragrance was divine. Made my Diwali celebrations special.",
  },
  {
    name: "Kabir Mehta",
    profilePic: "https://randomuser.me/api/portraits/men/38.jpg",
    rating: 5,
    purchasedItem: "Branded Leather Wallet",
    review: "Premium quality leather and stylish packaging. Loved gifting this.",
  },
  {
    name: "Tanya Malhotra",
    profilePic: "https://randomuser.me/api/portraits/women/50.jpg",
    rating: 5,
    purchasedItem: "Personalized Notebook Set",
    review: "Great quality paper and customization was perfect. Perfect for office gifting.",
  },
  {
    name: "Arjun Bansal",
    profilePic: "https://randomuser.me/api/portraits/men/60.jpg",
    rating: 4,
    purchasedItem: "Bluetooth Speaker",
    review: "Compact yet powerful sound. A great birthday gift option!",
  },
  {
    name: "Sanya Agarwal",
    profilePic: "https://randomuser.me/api/portraits/women/19.jpg",
    rating: 5,
    purchasedItem: "Eco-Friendly Jute Bags",
    review: "Beautiful designs and sustainable choice. My clients appreciated it.",
  },
  {
    name: "Vivaan Rao",
    profilePic: "https://randomuser.me/api/portraits/men/54.jpg",
    rating: 5,
    purchasedItem: "Crystal Trophy",
    review: "Amazing detailing and premium feel. Perfect for corporate awards.",
  },
  {
    name: "Ananya Desai",
    profilePic: "https://randomuser.me/api/portraits/women/20.jpg",
    rating: 5,
    purchasedItem: "Festive Diyas",
    review: "Elegant diyas that added charm to our Diwali decorations.",
  },
  {
    name: "Harshit Jain",
    profilePic: "https://randomuser.me/api/portraits/men/25.jpg",
    rating: 4,
    purchasedItem: "Desk Organizer",
    review: "Very useful and stylish. Helped me organize my work table easily.",
  },
  {
    name: "Ritika Gupta",
    profilePic: "https://randomuser.me/api/portraits/women/43.jpg",
    rating: 5,
    purchasedItem: "Personalized Travel Mug",
    review: "Perfect for gifting! Keeps drinks warm for hours and looks amazing.",
  },
  {
    name: "Karan Mallick",
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    purchasedItem: "Branded Backpack",
    review: "Sturdy, spacious, and stylish. My brother loved it as a birthday gift.",
  },
  {
    name: "Pooja Bhatt",
    profilePic: "https://randomuser.me/api/portraits/women/76.jpg",
    rating: 5,
    purchasedItem: "Luxury Perfume Gift Set",
    review: "Amazing fragrance and classy packaging. A wonderful anniversary present.",
  },
  {
    name: "Rahul Chaturvedi",
    profilePic: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 4,
    purchasedItem: "Wireless Earbuds",
    review: "Good sound quality and comfortable fit. My nephew loved the gift.",
  },
  {
    name: "Simran Kaur",
    profilePic: "https://randomuser.me/api/portraits/women/25.jpg",
    rating: 5,
    purchasedItem: "Copper Water Bottle",
    review: "Health-friendly and elegant. Perfect gift for family occasions.",
  },
  {
    name: "Aditya Sen",
    profilePic: "https://randomuser.me/api/portraits/men/15.jpg",
    rating: 5,
    purchasedItem: "Premium Leather Journal",
    review: "Luxurious look and smooth pages. Ideal for corporate giveaways.",
  },
  {
    name: "Nisha Reddy",
    profilePic: "https://randomuser.me/api/portraits/women/70.jpg",
    rating: 5,
    purchasedItem: "Exclusive Wine Glass Set",
    review: "Elegant design and great packaging. Made our housewarming memorable.",
  },
  {
    name: "Vikram Ahuja",
    profilePic: "https://randomuser.me/api/portraits/men/65.jpg",
    rating: 5,
    purchasedItem: "Executive Trolley Bag",
    review: "Lightweight yet durable. A wonderful corporate gifting option.",
  },
  {
    name: "Shruti Menon",
    profilePic: "https://randomuser.me/api/portraits/women/74.jpg",
    rating: 5,
    purchasedItem: "Festival Sweet Hamper",
    review: "Fresh sweets beautifully packed. Everyone loved the gift box!",
  },
  {
    name: "Parth Joshi",
    profilePic: "https://randomuser.me/api/portraits/men/42.jpg",
    rating: 5,
    purchasedItem: "Charging Cable Set",
    review: "Great quality and fast charging. Practical and thoughtful gift.",
  },
  {
    name: "Neha Batra",
    profilePic: "https://randomuser.me/api/portraits/women/48.jpg",
    rating: 5,
    purchasedItem: "Engraved Wooden Plaque",
    review: "Beautiful craftsmanship. It made our appreciation ceremony special.",
  },
  {
    name: "Manish Kapoor",
    profilePic: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 4,
    purchasedItem: "Gym Bag",
    review: "Spacious and durable. My cousin loved it as a fitness gift.",
  },
  {
    name: "Swati Mishra",
    profilePic: "https://randomuser.me/api/portraits/women/78.jpg",
    rating: 5,
    purchasedItem: "Festival Greeting Card Set",
    review: "Lovely prints and premium quality. Added a personal touch to gifting.",
  },
  {
    name: "Varun Sethi",
    profilePic: "https://randomuser.me/api/portraits/men/66.jpg",
    rating: 5,
    purchasedItem: "Wireless Keyboard & Mouse Combo",
    review: "Perfect for office use. Gifted it to a friend, and they loved it.",
  },
  {
    name: "Aditi Khurana",
    profilePic: "https://randomuser.me/api/portraits/women/80.jpg",
    rating: 5,
    purchasedItem: "Luxury Watch",
    review: "Elegant design and flawless packaging. Made my dad's birthday special.",
  },
  {
    name: "Reyansh Patil",
    profilePic: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 5,
    purchasedItem: "Eco-Friendly Planter Set",
    review: "Green, beautiful, and perfect for nature lovers. Great sustainable gift.",
  },
  {
    name: "Mitali Rao",
    profilePic: "https://randomuser.me/api/portraits/women/35.jpg",
    rating: 5,
    purchasedItem: "Corporate Gift Hamper",
    review: "A well-curated hamper that impressed our clients greatly.",
  },
]

const Testimonials = () => {
  return (
    <div className="main_ctr flex items-center justify-center flex-col py-10 gap-6 w-full 2xl:max-w-6xl 2xl:mx-auto">
      <div className="text_ctr flex items-center justify-center flex-col">
        <div className="heading_ctr ext-4xl md:text-5xl font-semibold text-center">
          What Our{" "}
          <span className="bg-[#111827] text-white px-2 py-1 rounded-sm">
            Customers
          </span>{" "}
          Are Saying
        </div>
        <div className="subheading_ctr text-lg mt-1 text-center">
          Join thousands of happy customers who found the perfect gift with us!
        </div>
      </div>
      <div className="w-full">
        <Marquee speed={20} pauseOnHover className="cursor-pointer">
        <div className="testimonials_ctr flex items-center justify-center w-full py-2">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="testimonial_card h-[175px] w-[350px] flex-shrink-0 rounded-lg bg-[#e0e0e0]/50 shadow-md p-6 flex flex-col gap-4 relative mr-4 border border-black"
            >
              <div className="flex items-center justify-start gap-3 w-full">
                <img
                  className="h-12 w-12 rounded-full bg-[#111827] object-cover object-center border border-[#111827]"
                  src={item.profilePic}
                />
                <div className="flex flex-col">
                  <div className="text-xl font-semibold -mb-1">{item.name}</div>
                  <div className="text-sm">{item.purchasedItem}</div>
                </div>
              </div>
              <div className="font-normal leading-snug w-full">
                {item.review}
              </div>
              <div className="bg-[#111827] absolute top-0 right-0 rounded-tr-lg text-center p-2 items-center justify-center text-white px-3">
                {item.rating}⭐
              </div>
            </div>
          ))}
        </div>
      </Marquee>
      <Marquee direction="right" speed={20}  pauseOnHover className="cursor-pointer">
        <div className="testimonials_ctr flex items-center justify-center w-full py-2">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="testimonial_card h-[175px] w-[350px] flex-shrink-0 rounded-lg bg-[#e0e0e0]/50 shadow-md p-6 flex flex-col gap-4 relative mr-4 border border-black"
            >
              <div className="flex items-center justify-start gap-3 w-full">
                <img
                  className="h-12 w-12 rounded-full bg-[#111827] object-cover object-center border border-[#111827]"
                  src={item.profilePic}
                />
                <div className="flex flex-col">
                  <div className="text-xl font-semibold -mb-1">{item.name}</div>
                  <div className="text-sm">{item.purchasedItem}</div>
                </div>
              </div>
              <div className="font-normal leading-snug w-full">
                {item.review}
              </div>
              <div className="bg-[#111827] absolute top-0 right-0 rounded-tr-lg text-center p-2 items-center justify-center text-white px-3">
                {item.rating}⭐
              </div>
            </div>
          ))}
        </div>
      </Marquee>
      </div>
    </div>
  );
};

export default Testimonials;
