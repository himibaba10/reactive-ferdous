import React from "react";
import Heading from "../ui/Heading";
import { ProjectImages } from "./ProjectImages";

const Portfolio = () => {
  return (
    <section
      id="portfolio"
      className="section flex flex-col md:flex-row items-center gap-8 md:gap-16 my-20"
    >
      <div className="w-full md:w-[45%]">
        <Heading className="text-5xl sm:text-7xl">
          The works closest to my heart
        </Heading>
      </div>
      <div className="w-full md:w-[55%]">
        <ProjectImages />
      </div>
    </section>
  );
};

export default Portfolio;
