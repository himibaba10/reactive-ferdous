import React from "react";
import Heading from "../ui/Heading";
import Bootstrap from "../assets/Bootstrap 1.png";
import Axios from "../assets/Axios 1.png";
import Redux from "../assets/redux-icon 1.png";
import MUI from "../assets/Material ui 1.png";
import Firebase from "../assets/Firebase 1.png";
import WordPress from "../assets/Wordpress 1.png";
import FramerMotion from "../assets/framer-motion 1.png";

const AdditionalSkills = () => {
  return (
    <section className="bg-gray px-2.5 lg:px-20 xl:px-32 py-10 rounded-xl text-center">
      <Heading className="text-5xl text-secondary mb-10">
        Additional skills
      </Heading>
      <div className="flex flex-wrap items-center justify-center md:justify-between gap-5 md:gap-2">
        <img className="w-12 md:w-auto" src={Bootstrap} alt="Bootstrap" />
        <img className="w-12 md:w-auto" src={Axios} alt="Axios" />
        <img className="w-12 md:w-auto" src={Redux} alt="Redux" />
        <img className="w-12 md:w-auto" src={MUI} alt="MUI" />
        <img className="w-12 md:w-auto" src={Firebase} alt="Firebase" />
        <img className="w-12 md:w-auto" src={WordPress} alt="WordPress" />
        <img className="w-12 md:w-auto" src={FramerMotion} alt="FramerMotion" />
      </div>
    </section>
  );
};

export default AdditionalSkills;
