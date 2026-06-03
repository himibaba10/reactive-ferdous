import expertiseImg from "../assets/My expertise image.png";
import { motion } from "framer-motion";

const HeroRightImage = () => {
  return (
    <motion.img
      initial={{ right: "-25rem", rotate: 7 }}
      whileInView={{ right: "-3rem" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="absolute top-64 sm:top-20"
      src={expertiseImg}
      alt="Hero right expertise image"
    />
  );
};

export default HeroRightImage;
