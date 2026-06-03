import React from "react";
import Heading from "../ui/Heading";
import { motion } from "framer-motion";
import { MdWeb, MdOutlineShoppingCart, MdOutlineSpeed, MdOutlineDesignServices } from "react-icons/md";

const services = [
  {
    id: 1,
    title: "Custom Web Applications",
    description: "Scalable, secure, and fast web apps tailored to your unique business needs using the MERN stack.",
    icon: <MdWeb size={40} className="text-secondary" />
  },
  {
    id: 2,
    title: "E-Commerce Solutions",
    description: "High-converting online stores built for seamless shopping experiences and robust inventory management.",
    icon: <MdOutlineShoppingCart size={40} className="text-secondary" />
  },
  {
    id: 3,
    title: "Performance Optimization",
    description: "Speed up your existing website to improve SEO rankings, retain visitors, and boost conversion rates.",
    icon: <MdOutlineSpeed size={40} className="text-secondary" />
  },
  {
    id: 4,
    title: "UI/UX Implementation",
    description: "Pixel-perfect conversion of Figma/Adobe XD designs into fully responsive, interactive web interfaces.",
    icon: <MdOutlineDesignServices size={40} className="text-secondary" />
  }
];

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="services" className="section my-20 py-20 w-full relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full filter blur-[120px] opacity-10 -z-10"></div>
      
      <div className="text-center mb-16">
        <Heading className="text-4xl sm:text-6xl mb-6">How I Can Help You</Heading>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          I partner with businesses to deliver digital solutions that solve real problems. Here is what I specialize in.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {services.map((service) => (
          <motion.div 
            key={service.id}
            variants={itemVariants}
            className="bg-zinc-800/50 border border-zinc-700/50 p-8 rounded-2xl hover:bg-zinc-800 transition-colors duration-300 group"
          >
            <div className="bg-zinc-900 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
            <p className="text-zinc-400 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
