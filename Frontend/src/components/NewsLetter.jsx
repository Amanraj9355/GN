import React, { useState } from "react";

const NewsLetter = () => {
  const[email,setEmail] = useState("");

  const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:8000/api/enquiry/add-enquiry",
      { email}
    );
    setEmail('');
    setMessage('');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="my-8 px-4 sm:px-8 lg:px-0 w-full md:max-w-6xl md:mx-auto">
      <div className="main_ctr bg-[#111827] max-h-[250px] sm:h-[200px] lg:h-[300px] px-8 sm:px-12 lg:px-20 text-white py-16 lg:py-36 w-auto rounded-xl flex flex-row-reverse items-center justify-between gap-6">
        <div className="left_ctr w-7/12 flex flex-col gap-4">
          <div className="heading font-semibold text-2xl md:text-3xl lg:text-5xl leading-6">
            Want to Stay Updated?
          </div>
          <div className="sub_heading text-sm sm:text-md lg:text-xl text-white/75">
            Subscribe to our newsletter for new gifts, festive sales launch,
            exclusive offers and more.
          </div>
          <div>
            <form className="flex gap-3 w-full">
            <input
            onChange={(e)=>setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full text-sm px-6 py-3 rounded-md bg-[#1F2937] text-white"
            ></input>
            <button
            onSubmit={onSubmitHandler}
            type="submit"
             className="w-full text-sm px-6 py-3 rounded-md bg-white/90 text-[#1F2937]">
              Subscribe
            </button>
            </form>
          </div>
        </div>
        <div className="right_ctr w-5/12 flex items-center justify-center">
          <img
            src="/CtaBannerImg.png"
            className="max-w-[90%] sm:w-[75%] md:w-[60%] mt-8 animate-customBounce"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
