import React from "react";
import { motion } from "framer-motion";

const SkillCard = ({ skill }) => {
  const { name, image } = skill;
  return (
    <motion.div
      initial={{ y: 150 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: "50" }}
      style={{ boxShadow: "-1px -1px 0px rgba(255,255,255,0.3)" }}
      className="bg-gray rounded-md p-4 relative overflow-hidden flex flex-col"
    >
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="w-20 h-auto absolute -top-5 -right-5 scale-150 grayscale opacity-20 rotate-12"
      />
      <img src={image} alt={name} loading="lazy" className="w-20 h-auto" />
      <h3 className="text-secondary font-bebas text-3xl pt-5 mt-auto">
        {name}
      </h3>
    </motion.div>
  );
};

export default SkillCard;
