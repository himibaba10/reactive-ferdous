import React from "react";
import Heading from "../ui/Heading";
import { motion } from "framer-motion";
import { MdWeb, MdOutlineDesignServices, MdOutlineBrush, MdArrowForward, MdOutlineFormatShapes } from "react-icons/md";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Web Development",
    description: "We build lightning-fast, high-converting websites and applications tailored to solve your specific business challenges and rank higher on Google.",
    icon: <MdWeb size={40} className="text-secondary" />,
    url: "/services/web-development"
  },
  {
    id: 2,
    title: "Graphic Design",
    description: "Stand out from the crowd with premium, eye-catching visual identities and marketing assets designed to elevate your brand.",
    icon: <MdOutlineBrush size={40} className="text-secondary" />,
    url: "/services/graphic-design"
  },
  {
    id: 3,
    title: "Figma UI/UX Design",
    description: "We craft beautiful, user-centric interfaces in Figma that provide seamless experiences, micro-animations, and high conversion rates.",
    icon: <MdOutlineDesignServices size={40} className="text-secondary" />,
    url: "/services/figma-design"
  },
  {
    id: 4,
    title: "Logo Design",
    description: "We create distinctive, memorable logos that capture the essence of your business and serve as the cornerstone of your brand identity.",
    icon: <MdOutlineFormatShapes size={40} className="text-secondary" />,
    url: "/services/logo-design"
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
        <Heading className="text-4xl sm:text-6xl mb-6">How We Can Help You</Heading>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          We partner with businesses to deliver digital solutions that solve real problems. Here is what We specialize in.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {services.map((service) => (
          <motion.div 
            key={service.id}
            variants={itemVariants}
            className="bg-zinc-800/50 border border-zinc-700/50 p-6 rounded-2xl hover:bg-zinc-800 transition-colors duration-300 group flex flex-col"
          >
            <div className="bg-zinc-900 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
              {service.description}
            </p>
            <Link 
              to={service.url}
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center text-secondary text-sm font-semibold group/link mt-auto w-fit"
            >
              Learn More 
              <MdArrowForward className="ml-2 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
