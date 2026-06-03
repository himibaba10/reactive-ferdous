import React from "react";
import PrimaryButton from "../ui/PrimaryButton";
import Heading from "../ui/Heading";

const About = () => {
  return (
    <section id="about" className="my-16 sm:my-28 section">
      <div className="max-w-3xl text-center mx-auto">
        <Heading className="font-bebas text-7xl text-secondary mb-5">
          Who Am I?
        </Heading>
        <p className="text-base sm:text-xl mb-12 text-zinc-300 leading-relaxed">
          I don't just write code; I build digital assets that generate revenue. With over 4 years of experience specializing in WordPress and modern web infrastructure, I bridge the gap between stunning design and high-converting architecture.
          <br />
          <br />
          My philosophy is simple: your website shouldn't be an expense—it should be your hardest-working sales engine. Whether you need a lead-optimized WordPress funnel or a custom React application, I engineer solutions focused entirely on maximizing your Return on Investment (ROI).
        </p>
        <a href="#portfolio">
          <PrimaryButton>SEE MY PROJECTS</PrimaryButton>
        </a>
      </div>
    </section>
  );
};

export default About;
