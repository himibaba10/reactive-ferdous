import React from "react";
import PrimaryButton from "../ui/PrimaryButton";
import { motion } from "framer-motion";
import { MdLocalOffer } from "react-icons/md";

const DiscountBanner = ({ serviceName = "this service" }) => {
  const message = `Hi Team, I'm interested in ${serviceName} and would like to claim the 50% discount for my first service!`;
  const whatsappUrl = `https://wa.me/8801997722621?text=${encodeURIComponent(message)}`;

  return (
    <section className="w-full py-16 px-4 bg-zinc-900 border-y border-secondary/30 relative overflow-hidden my-10 shadow-[0_0_50px_rgba(64,140,255,0.1)]">
      {/* Background glow specific to discount */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-secondary/20 filter blur-[120px] z-0 pointer-events-none"></div>

      <motion.div 
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex-1 text-center md:text-left flex flex-col md:flex-row items-center gap-6">
          <div className="bg-secondary text-black p-4 rounded-full hidden md:block shadow-[0_0_20px_rgba(64,140,255,0.5)] animate-pulse">
            <MdLocalOffer size={48} />
          </div>
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-2">
              Get <span className="text-secondary">50% Off</span> Your First Service
            </h2>
            <p className="text-zinc-300 text-lg">
              Special introductory offer for new clients. Let's build something amazing together.
            </p>
          </div>
        </div>
        
        <div className="shrink-0 mt-6 md:mt-0">
          <PrimaryButton href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Claim Your Discount
          </PrimaryButton>
        </div>
      </motion.div>
    </section>
  );
};

export default DiscountBanner;
