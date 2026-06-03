import React from "react";
import Heading from "../ui/Heading";
import { motion } from "framer-motion";
import PrimaryButton from "../ui/PrimaryButton";

const HeroInfo = () => {
  return (
    <div className="text-center flex flex-col items-center px-4">
      <h1 className="text-2xl sm:text-5xl lg:text-7xl leading-tight flex flex-col items-center">
        <Heading as="span" className="text-5xl mb-3 sm:mb-0 sm:text-7xl text-secondary leading-snug max-w-4xl">
          I Build Web Apps That
        </Heading>
        <motion.div
          className="text-nowrap mx-auto py-3"
          initial={{ width: "0%", overflow: "hidden" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3 }}
        >
          Drive{" "}
          <span
            className="px-5 rounded-xl text-black bg-secondary"
            style={{ boxShadow: "0.4px -0.4px 1.5px rgba(255,255,255,1)" }}
          >
            Business
          </span>{" "}
          Growth
        </motion.div>
      </h1>
      
      <p className="mt-6 max-w-2xl text-zinc-400 text-lg sm:text-xl">
        Stop losing customers to slow, outdated websites. I specialize in crafting modern, high-performance web solutions designed to convert visitors into paying clients.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-6 items-center justify-center">
        <PrimaryButton href="https://wa.me/8801997722621" target="_blank" rel="noopener noreferrer">
          Start Your Project Today
        </PrimaryButton>
        <a href="https://wa.me/8801997722621?text=Hi%20Ferdous,%20I'd%20like%20to%20get%20a%20free%20website%20audit!" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline underline-offset-4 transition-colors font-medium">
          Get a Free Website Audit
        </a>
      </div>
    </div>
  );
};

export default HeroInfo;
