'use client';
import { useState } from 'react';

const faqs = [
  {
    question: "How do I purchase a product?",
    answer: "To purchase a product, browse our catalog, add your desired items to the cart, and proceed to checkout."
  },
  {
    question: "What is the duration of the service?",
    answer: "The duration varies depending on the service. Most services are valid for 30 days unless stated otherwise."
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes, we offer a 7-day money-back guarantee for all eligible purchases. Please refer to our refund policy."
  }
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-10">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-300 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center text-lg font-medium bg-white hover:bg-gray-50"
            >
              {faq.question}
              <span className="text-xl">{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
