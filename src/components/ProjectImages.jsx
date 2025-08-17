import { useState } from "react";
import project1Img from "../assets/project-1.png";
import project2Img from "../assets/project-2.png";
import project3Img from "../assets/project-3.png";
import project4Img from "../assets/project-4.png";

export const ProjectImages = () => {
  const [isOpen, setIsOpen] = useState(0);
  const toggle = ({ currentIdx }) =>
    setIsOpen((prevIdx) => (prevIdx == currentIdx ? 0 : currentIdx));
  const sliders = [
    {
      img: project1Img,
      title: "FH Cafe",
      technologies: [
        "React",
        "ContextApi",
        "Tanstack Query",
        "Express",
        "MongoDB",
        "JWT",
      ],
      live: "https://eleventh-assignment-b4b1e.web.app/",
      frontendCodeLink: "https://github.com/himibaba10/fh-cafe-client",
      backendCodeLink: "https://github.com/himibaba10/fh-cafe-server",
    },
    {
      img: project2Img,
      title: "Contest HUB",
      technologies: [
        "React",
        "ContextApi",
        "Tanstack Query",
        "Express",
        "MongoDB",
        "Dashboard",
        "JWT",
      ],
      live: "https://twelfth-assignment-82598.web.app/",
      frontendCodeLink:
        "https://github.com/himibaba10/twelfth-assignment-client",
      backendCodeLink:
        "https://github.com/himibaba10/twelfth-assignment-server",
    },
    {
      img: project3Img,
      title: "Finsweet",
      technologies: ["HTML", "CSS"],
      live: "https://himibaba10.github.io/own-website7",
      frontendCodeLink: "https://github.com/himibaba10/own-website7",
    },
    {
      img: project4Img,
      title: "Mobile Shop",
      technologies: ["React", "ContextApi", "Tailwind", "Express", "MongoDB"],
      live: "https://earnest-frangollo-46f67e.netlify.app",
      frontendCodeLink: "https://github.com/himibaba10/tenth-assignment-client",
      backendCodeLink: "https://github.com/himibaba10/tenth-assignment-server",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-end">
      {/* map  */}
      {sliders.map((slide, idx) => (
        <div
          onClick={() => toggle({ currentIdx: idx })}
          className={`rounded-xl md:h-[600px] relative duration-500 ease-in-out overflow-hidden ${
            isOpen == idx
              ? "w-full h-[400px] md:w-[400px] "
              : "w-full md:w-[80px] h-[80px]"
          }`}
          key={idx}
        >
          {/* main image  */}
          <img
            className="h-full object-cover rounded-lg w-full md:w-full object-top hover:object-[0_100%] transition-all duration-[2s]"
            src={slide.img}
            alt=""
          />
          <div
            className={`text-white bg-black w-full absolute left-0 bottom-0 p-2 ${
              isOpen == idx ? "block " : "hidden"
            }`}
          >
            <div>
              {slide.technologies?.map((tech) => (
                <p
                  key={tech}
                  className="inline-block bg-white mx-1 text-black p-2 text-sm m-1 rounded"
                >
                  {tech}
                </p>
              ))}
            </div>
            <div className="my-2">
              <a
                href={slide.frontendCodeLink}
                target="_blank"
                className="underline mr-3"
              >
                Frontend Code
              </a>
              {slide.backendCodeLink && (
                <a
                  href={slide.backendCodeLink}
                  target="_blank"
                  className="underline"
                >
                  Backend Code
                </a>
              )}
            </div>
            <a href={slide.live} target="_blank" className="text-2xl underline">
              {slide.title}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
