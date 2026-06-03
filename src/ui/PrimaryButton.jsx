import React from "react";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";

const PrimaryButton = ({
  children,
  type = "button",
  width = "w-auto",
  disabled = false,
  href,
  target,
  rel,
  className = "",
}) => {
  const icon = {
    changePosition: {
      scale: 1,
    },
  };
  const span = {
    changePosition: {
      left: "1rem",
    },
  };
  const container = {
    changePosition: { boxShadow: "2px 2px 0px rgba(232,248,139,1)" },
  };

  const Component = href ? motion.a : motion.button;
  const props = href 
    ? { href, target, rel } 
    : { type, disabled };

  return (
    <Component
      {...props}
      initial={{ boxShadow: "0px 0px 0px rgba(232,248,139,1)" }}
      variants={container}
      whileHover="changePosition"
      className={`${width} uppercase bg-secondary border border-black text-black px-10 py-3 rounded-full font-medium inline-flex items-center justify-center relative ${className}`}
    >
      <motion.span
        variants={icon}
        initial={{ scale: 0 }}
        className="bg-primary p-2 rounded-full absolute left-1 text-white"
      >
        <MdArrowOutward size={25} />
      </motion.span>
      <motion.span initial={{ left: 0 }} variants={span} className="relative">
        {children}
      </motion.span>
    </Component>
  );
};

export default PrimaryButton;
