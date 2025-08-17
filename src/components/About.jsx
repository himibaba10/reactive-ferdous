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
        <p className="text-base sm:text-xl mb-12">
          I Am a full-stack website developer specialized in ReactJS. Plus, I
          also know some WordPress front-end development with Elementor and
          WooCommerce.
          <br />
          <br />
          Programming is my passion, that is the reason I am working at the time
          of my academic career.
          <br />
          <br />
          Additionally, I like to play PC games and read story-type books in my
          leisure time which is kinda fun and relaxing!
        </p>
        <a href="#portfolio">
          <PrimaryButton>SEE MY PROJECTS</PrimaryButton>
        </a>
      </div>
    </section>
  );
};

export default About;
