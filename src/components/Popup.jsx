import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import PrimaryButton from "../ui/PrimaryButton";

const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if they've already seen or closed the popup
    const hasSeenPopup = localStorage.getItem("hasSeenDiscountPopup");
    
    if (!hasSeenPopup) {
      // Show popup after 8 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem("hasSeenDiscountPopup", "true");
  };

  const whatsappMessage = encodeURIComponent("Hi Team, I'd like to claim my 50% discount for my first project!");
  const whatsappUrl = `https://wa.me/8801997722621?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-zinc-900 border border-zinc-700 w-full max-w-lg rounded-3xl p-8 relative shadow-2xl text-center overflow-hidden"
          >
            {/* Decorative background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-secondary filter blur-[80px] opacity-20 -z-10"></div>
            
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full transition-colors"
            >
              <MdClose size={24} />
            </button>

            <div className="text-5xl mb-4">🎁</div>
            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
              Wait! Get Up to <span className="text-secondary">50% Off</span> Your First Project
            </h2>
            
            <p className="text-zinc-400 mb-8 leading-relaxed">
              As a first-time client, We want to prove our value to you. Let's build your dream project at half the cost. <strong className="text-white">Valid for the next 2 clients only.</strong>
            </p>

            <PrimaryButton
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closePopup}
              className="inline-block"
            >
              Claim My 50% Discount
            </PrimaryButton>
            
            <button 
              onClick={closePopup}
              className="block w-full text-center mt-6 text-sm text-zinc-500 hover:text-zinc-300 underline underline-offset-4 transition-colors"
            >
              No thanks, I prefer paying full price
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
