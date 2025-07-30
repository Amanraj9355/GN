import React, { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/store";
import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";

const Contact = () => {
  const {backendUrl} = useContext(ShopContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${backendUrl}/api/contact/send-email`, {
        name,
        email,
        message,
      });

      console.log("Email sent:", res.data);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="w-full px-6 md:px-0">
      {/* Contact Heading */}
      <div className="text-center py-10">
        <h2 className="text-4xl md:text-5xl font-semibold">
          <span className="bg-gray-800 px-2 text-white">Contact Us</span>
        </h2>
        <p className="text-gray-600 mt-3">
          Have questions or feedback? Reach out to us by filling out the form
          below.
        </p>
      </div>

      {/* Contact Form + Image */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto px-4 py-10 bg-[#f7f5f1] rounded-xl border border-gray-300">
        {/* Left Section: Form */}
        <div className="w-full md:w-1/2 px-6 py-6 space-y-6">
          <p className="text-sm font-medium text-gray-800">
            Feel free to message us with any questions or concerns.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                className="w-full px-4 py-2 border rounded-xl h-28 resize-none focus:outline-none focus:ring-2 focus:ring-black"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              SEND
            </button>
          </form>
          {/* Social Links */}
<div className="flex gap-4 mt-6 justify-center md:justify-start">
  <a
    href="https://wa.me/918217597497"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-full border border-black p-3 hover:bg-black hover:text-white transition duration-200 ease-in-out"
  >
    <MessageCircle size={20} />
  </a>

  <a
    href="https://www.instagram.com/giftnation.blr?igsh=ZTRxanE4cW9taWR2"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-full border border-black p-3 hover:bg-black hover:text-white transition duration-200 ease-in-out"
  >
    <Instagram size={20} />
  </a>

  <a
    href="mailto:contact@giftnation.in"
    className="rounded-full border border-black p-3 hover:bg-black hover:text-white transition duration-200 ease-in-out"
  >
    <Mail size={20} />
  </a>
  <a
  href="tel:+918217597497"
  className="rounded-full border border-black p-3 hover:bg-black hover:text-white transition duration-200 ease-in-out"
>
  <Phone size={20} />
</a>

</div>

        </div>

        {/* Right Section: Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 mt-10 md:mt-0">
          <img
            src="/headerRight.png"
            alt="Contact Visual"
            className="w-full max-h-[400px] object-contain"
          />
        </div>
        
      </div>

      {/* Embedded Map */}
      <div className="w-full my-10">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.398047921515!2d77.6019094!3d12.946361999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15d38e0b8827%3A0xb8c8e7ac5ff8f0dd!2sGift%20Nation!5e0!3m2!1sen!2sin!4v1753717379645!5m2!1sen!2sin"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[500px] rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
