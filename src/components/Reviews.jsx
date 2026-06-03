import React, { useState, useEffect } from "react";
import Heading from "../ui/Heading";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { MdFormatQuote } from "react-icons/md";

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
      
      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-8 relative z-10">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            aria-label={`View review ${idx + 1}`}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === currentIndex ? "bg-secondary" : "bg-zinc-600 hover:bg-zinc-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
