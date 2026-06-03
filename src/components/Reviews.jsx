import React, { useState, useEffect } from "react";
import Heading from "../ui/Heading";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { MdFormatQuote, MdChevronLeft, MdChevronRight } from "react-icons/md";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000); // Slide every 4 seconds
    return () => clearInterval(interval);
  }, [reviews]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

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
          Don't just take my word for it. Check out what my clients have to say about the results we've achieved together.
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
