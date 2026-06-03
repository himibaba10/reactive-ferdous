import React from "react";
import PrimaryButton from "../ui/PrimaryButton";
import { motion } from "framer-motion";

const LeadBanner = ({ text, buttonText, message }) => {
  const whatsappUrl = `https://wa.me/8801997722621?text=${encodeURIComponent(message)}`;

  return (
    <section className="w-full py-16 px-4 bg-zinc-900 border-y border-zinc-800 relative overflow-hidden my-10">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-32 bg-secondary/10 filter blur-[100px] z-0 pointer-events-none"></div>

      <motion.div 
        className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-3xl sm:text-4xl font-bold text-white text-center md:text-left leading-tight flex-1">
          {text}
        </h3>
        
        <div className="shrink-0">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <PrimaryButton>{buttonText}</PrimaryButton>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default LeadBanner;
