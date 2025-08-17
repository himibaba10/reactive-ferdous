import React from "react";
import Heading from "../ui/Heading";
import { motion } from "framer-motion";

const HeroInfo = () => {
  return (
    <div className="text-center">
      <h1 className="text-2xl sm:text-5xl lg:text-7xl leading-tight">
        <Heading className="text-5xl mb-3 sm:mb-0 sm:text-8xl text-secondary">
          I'm Ferdous Ahmed
        </Heading>
        <motion.div
          className="text-nowrap mx-auto py-3"
          initial={{ width: "0%", overflow: "hidden" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3 }}
        >
          A{" "}
          <span
            className="px-5 rounded-xl"
            style={{ boxShadow: "0.4px -0.4px 1.5px rgba(255,255,255,1)" }}
          >
            Full Stack
          </span>{" "}
          Developer
        </motion.div>
      </h1>
    </div>
  );
};

export default HeroInfo;
