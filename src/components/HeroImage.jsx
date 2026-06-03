import heroMainImg from "../assets/Hero main image.png";
import { motion } from "framer-motion";

const HeroImage = () => {
  return (
    <div className="relative inline-block">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-[650px] aspect-square absolute bottom-[5px] -left-24 top-14 bg-secondary rounded-full blur-3xl opacity-25"
      />
      <div className="min-h-[410px] sm:min-h-[577px]">
        <img
          src={heroMainImg}
          alt="Ferdous Ahmed - Freelance WordPress Developer"
          className="mx-auto w-auto relative translate-y-3"
        />
      </div>
    </div>
  );
};

export default HeroImage;
