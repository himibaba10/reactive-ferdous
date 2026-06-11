import React, { useState } from "react";
import Heading from "../ui/Heading";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";

const defaultFaqs = [
  {
    question: "How long does it take to build a website/app?",
    answer: "The timeline depends entirely on the complexity of your project. A standard landing page might take 1-2 weeks, while a full-scale web application could take 1-3 months. We establish a clear timeline during our discovery call."
  },
  {
    question: "What is your pricing structure?",
    answer: "our pricing is project-based and depends on the scope, features, and complexity of what we are building. We prioritize high-quality, scalable code that delivers a strong ROI for your business."
  },
  {
    question: "What if I don't have a design ready?",
    answer: "No problem at all! We offer complete UI/UX implementation services. If you need a design from scratch, we can work together to create a stunning interface before development begins."
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer: "Absolutely. We provide post-launch support and maintenance packages to ensure your application stays fast, secure, and up-to-date with the latest technologies."
  }
];

const FAQ = ({ 
  faqs = defaultFaqs, 
  title = "Frequently Asked Questions", 
  description = "Got questions? We've got answers. Here are some of the most common things clients ask before we start working together." 
}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section my-20 py-20 w-full relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <div className="text-center mb-16">
        <Heading className="text-4xl sm:text-6xl mb-6">{title}</Heading>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          {description}
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border border-zinc-700/50 rounded-xl overflow-hidden bg-zinc-900/50">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none hover:bg-zinc-800/50 transition-colors"
            >
              <span className="text-lg font-bold text-white">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-secondary"
              >
                <MdKeyboardArrowDown size={24} />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-5 pt-2 text-zinc-400 leading-relaxed border-t border-zinc-700/30">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
