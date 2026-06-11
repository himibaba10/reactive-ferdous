import React from "react";
import Heading from "../ui/Heading";
import { motion, AnimatePresence } from "framer-motion";
import { MdFormatQuote, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useReviews } from "../hooks/useReviews";

const Reviews = () => {
  const {
    reviews,
    loading,
    currentIndex,
    nextSlide,
    prevSlide
  } = useReviews();

  if (loading) {
    return (
      <section id="reviews" className="section my-20 py-20 w-full bg-zinc-900/30 rounded-3xl relative overflow-hidden flex justify-center items-center min-h-[400px]">
        <p className="text-xl text-zinc-500 animate-pulse">Loading reviews...</p>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className="section my-20 py-20 w-full bg-zinc-900/30 rounded-3xl relative overflow-hidden">
      <div className="absolute top-10 left-10 text-zinc-800 opacity-20">
        <MdFormatQuote size={120} />
      </div>

      <div className="text-center mb-16 relative z-10">
        <Heading className="text-4xl sm:text-6xl mb-4">Client Success Stories</Heading>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          Don't just take our word for it. Check out what our clients have to say about the results we've achieved together.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 flex justify-center items-center min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={reviews[currentIndex].img}
            alt="Client Review"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            loading="lazy"
            className="w-full max-h-[600px] object-contain rounded-xl shadow-2xl"
          />
        </AnimatePresence>
      </div>
      
      {/* Navigation Arrows */}
      <div className="flex justify-center gap-6 mt-8 relative z-10">
        <button
          aria-label="Previous review"
          onClick={prevSlide}
          className="p-3 rounded-full bg-zinc-800 hover:bg-secondary hover:text-black transition-colors text-zinc-300 shadow-lg"
        >
          <MdChevronLeft size={28} />
        </button>
        <button
          aria-label="Next review"
          onClick={nextSlide}
          className="p-3 rounded-full bg-zinc-800 hover:bg-secondary hover:text-black transition-colors text-zinc-300 shadow-lg"
        >
          <MdChevronRight size={28} />
        </button>
      </div>
    </section>
  );
};

export default Reviews;
