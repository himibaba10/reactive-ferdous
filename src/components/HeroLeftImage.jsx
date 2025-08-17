import React from "react";
import clientReviewImage from "../assets/Clietn Review.png";
import { motion } from "framer-motion";

const HeroLeftImage = () => {
  return (
    <motion.img
      initial={{ left: "-25rem", top: "0px", rotate: -5 }}
      whileInView={{ left: "-2rem" }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
      className="absolute"
      src={clientReviewImage}
      alt="Hero left image"
    />
  );
};

export default HeroLeftImage;
