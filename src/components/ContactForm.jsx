import { useState } from "react";
import { LuUser } from "react-icons/lu";
import { FaRegEnvelope, FaRegStickyNote } from "react-icons/fa";
import PrimaryButton from "../ui/PrimaryButton";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xvoebwnj");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    await handleSubmit(event);
    form.reset();
  };

  return (
    <div
      style={{ boxShadow: "3px 3px 0px rgba(232,248,139,1)" }}
      className="bg-gradient-to-tr from-primary to-transparent p-7 md:p-12 lg:p-20"
    >
      <form
        className="flex flex-col gap-3 text-primary relative"
        onSubmit={handleFormSubmit}
      >
        <motion.div
          initial={{ scale: 1 }}
          whileTap={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <LuUser className="absolute text-2xl top-[14px] left-2.5" />
          <motion.input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="w-full border border-primary pl-10 p-3.5 placeholder:text-primary"
          />
        </motion.div>
        <motion.div
          initial={{ scale: 1 }}
          whileTap={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <FaRegEnvelope className="absolute text-xl top-[17px] left-3" />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="w-full border border-primary pl-10 p-3.5 placeholder:text-primary"
          />
        </motion.div>
        <motion.div
          initial={{ scale: 1 }}
          whileTap={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <FaRegStickyNote className="absolute text-xl top-[17px] left-3" />
          <textarea
            name="description"
            placeholder="Have something to say? I'd love to hear! :D"
            className="w-full border border-primary pl-10 p-3.5 placeholder:text-primary resize-none"
          />
        </motion.div>
        <div className="self-end">
          <PrimaryButton type="submit" disabled={state.submitting}>
            {state.submitting ? "Submitting" : "Mail Me!"}
          </PrimaryButton>
        </div>
        {!state.submitting && state.succeeded && (
          <p className="text-white text-center absolute bottom-0">
            Thanks for joining!
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
