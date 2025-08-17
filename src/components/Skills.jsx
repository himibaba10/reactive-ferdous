import React from "react";
import Heading from "../ui/Heading";
import AdditionalSkills from "./AdditionalSkills";
import SkillCards from "./SkillCards";
import ExperienceCard from "./ExperienceCard";

const Skills = () => {
  return (
    <section id="skills" className="my-10 section">
      <Heading className="font-bebas text-7xl text-secondary mb-5 text-center">
        My Skills
      </Heading>
      <div className="flex flex-col lg:flex-row mt-7 mb-20 gap-5 sm:gap-10">
        <SkillCards />
        <ExperienceCard />
      </div>
    </section>
  );
};

export default Skills;
