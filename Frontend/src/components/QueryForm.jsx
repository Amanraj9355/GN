import React, { useContext, useState } from "react";
import axios from "axios";
import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { ShopContext } from "../context/store";

const QueryForm = () => {
  const {backendUrl} = useContext(ShopContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendUrl}/api/enquiry/add-enquiry`,
        { name, email, query }
      );
      setName("");
      setEmail("");
      setQuery("");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="enquiry" className="flex flex-col-reverse items-center justify-center px-4 sm:px-20 md:px-0 my-10 w-full md:max-w-6xl md:mx-auto gap-6">
      <div className="w-full bg-[#111827] text-[#111827] p-8 rounded-lg shadow-lg">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-4 items-center justify-center"
        >
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Your Name"
            className="p-3 border bg-[#e0e0e0] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white w-full"
          />
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Your Email"
            className="p-3 border bg-[#e0e0e0] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white w-full"
          />
          <textarea
            placeholder="Your Query"
            name="query"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            rows="4"
            className="p-3 border bg-[#e0e0e0] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white w-full"
          />
          <div className="flex sm:flex-row flex-col items-center justify-center gap-6 sm:gap-3 border-white w-[60%] mt-4 sm:mt-0">
            <div className="w-fit flex items-center justify-center text-white gap-3 text-lg px-10">
              <div className="rounded-full border border-white p-2 hover:bg-white hover:text-[#111827] cursor-pointer duration-200 ease-in-out">
                <a href="https://wa.me/918217597497
"><MessageCircle size={20} /></a>
              </div>
              <a href="https://www.instagram.com/giftnation.blr?igsh=ZTRxanE4cW9taWR2"><div className="rounded-full border border-white p-2 hover:bg-white hover:text-[#111827] cursor-pointer duration-200 ease-in-out">
                <Instagram size={20} />
              </div>
              </a>
              <a href="mailto:contact@giftnation.in">
              <div className="rounded-full border border-white p-2 hover:bg-white hover:text-[#111827] cursor-pointer duration-200 ease-in-out">
                <Mail size={20} />
              </div>
              </a>
              
            </div>
            <button
              type="submit"
              className="bg-[#111827] border border-white text-white font-semibold py-3 rounded-md hover:bg-white hover:text-[#111827] duration-200 ease-in-out transition w-full"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      <div className="w-full flex items-center justify-center flex-col text-center md:text-left">
        <div className="text_ctr flex items-center justify-center flex-col">
          <div className="heading_ctr ext-4xl md:text-5xl font-semibold text-center">
            Got Questions? We’ve Got Answers!
          </div>
          <div className="subheading_ctr text-lg mt-1 text-center">
            Our team is here to help. Reach out to us, and we’ll get back to
            you in no time!
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryForm;
