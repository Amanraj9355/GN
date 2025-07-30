import React, { useState } from "react";

const faqs = [
  {
    question: "What is corporate gifting and why is it important?",
    answer:
      "Corporate gifting involves sending branded or personalized items to clients, employees, or partners to strengthen relationships, show appreciation, and build loyalty. It drives engagement by delivering thoughtful, meaningful experiences beyond conventional marketing.",
  },
  {
    question: "What types of gifts are suitable for corporate purposes?",
    answer:
      "Popular choices include branded bags, custom apparel (T-shirts, pens, notebooks), gift hampers, drinkware, tech accessories, and executive items—each tailored to occasion, recipient profile, and company branding.",
  },
  {
    question: "How much should I budget for corporate gifts?",
    answer:
      "Budget depends on scale and purpose. A typical range might be ₹300–₹1,000 per item for employee appreciation or client outreach. For high-end events or executive gifts, ₹1,000–₹5,000+ may be appropriate.",
  },
  {
    question: "How early should I place an order for corporate gifts?",
    answer:
      "For custom orders or branded items, it's best to place requests at least 3–4 weeks in advance, especially around holidays or peak seasons. For smaller bulk items, a 1–2 week lead time is usually sufficient.",
  },
  {
    question: "Can I personalize gifts with names or logos?",
    answer:
      "Absolutely! Personalization options include individual names, logos, messages, or even unique artwork. We can match printing or engraving techniques to the item—whether mugs, bags, or apparel.",
  },
  {
    question: "Do you provide gifting solutions from a brief or image reference?",
    answer:
      "Yes. We offer end-to-end sourcing and manufacturing, working from a product brief, Google image, or mood board. Our flexibility ensures bespoke gifts that align with your brand and vision.",
  },
  {
    question: "Can you ship to multiple addresses nationwide?",
    answer:
      "Yes—we provide multi-location fulfillment, including address collection tools and consolidated shipping for teams or dispersed clients. We manage logistics, packaging, and compliance across regions.",
  },
  {
    question: "Are eco-friendly gifting options available?",
    answer:
      "Yes. We work with sustainable materials such as organic cotton, recycled fabrics, bamboo, or seed-paper. Eco-conscious packaging and socially responsible sourcing are also available for gifting programs that reflect your brand’s values.",
  },
  {
    question: "What are common corporate gifting mistakes to avoid?",
    answer:
      "Avoid impersonal, overly promotional, or controversial gifts. Don’t exceed company policy limits or choose items that conflict with recipients’ values or dietary needs. Select gifts that are thoughtful, neutral, and aligned with professional etiquette.",
  },
  {
    question: "How do I evaluate the ROI of a gifting campaign?",
    answer:
      "Track impact through engagement metrics, feedback surveys, new leads generated, repeat orders, or brand sentiment. Calculate cost per recipient and compare to responses or conversion metrics for measurable ROI.",
  },
];


const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-[#f9f9f9] py-10 md:py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">FAQs</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b pb-4">
              <button
                className="w-full text-left flex justify-between items-center text-lg font-medium"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {faq.question}
                <span>{openIndex === i ? "-" : "+"}</span>
              </button>
              {openIndex === i && (
                <p className="mt-3 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
