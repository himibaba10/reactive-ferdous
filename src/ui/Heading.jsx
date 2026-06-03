import { motion } from "framer-motion";

const Heading = ({ children, className, as: Component = "h2" }) => {
  return (
    <Component className={`uppercase ${className}`}>
      {children.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.05,
            duration: 0,
            type: "spring",
            stiffness: 300,
            damping: 10,
          }}
          className="inline-block font-bebas"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Component>
  );
};

export default Heading;
