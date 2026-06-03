import React from "react";
import Heading from "../ui/Heading";
import ContactSocialIcons from "./ContactSocialIcons";

const ContactInfo = () => {
  return (
    <div className="w-full sm:w-1/2">
      <Heading className="text-6xl text-secondary mb-5">
        Ready to Start Your Project?
      </Heading>
      <div className="bg-zinc-800/80 border border-zinc-700 p-4 rounded-xl mb-6 inline-block">
        <p className="text-sm text-secondary font-bold mb-1">🔥 Limited Availability</p>
        <p className="text-sm text-zinc-300">
          Due to high demand and my commitment to quality, I only take on <span className="text-white font-bold">2 new projects</span> per month. Spots for next month are filling up fast.
        </p>
      </div>

      <p className="text-lg text-zinc-300 max-w-md leading-relaxed mb-6">
        Let's discuss how we can work together to build a digital solution that helps your business grow.
      </p>

      <div className="flex items-center gap-3 text-zinc-300">
        <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <p className="text-sm font-medium">100% Satisfaction Guarantee on all design and development milestones.</p>
      </div>
      <ul className="mt-10 text-lg space-y-2">
        <li>
          Phone:{" "}
          <a
            className="underline underline-offset-2"
            href="tel:+880-199-772-2621"
          >
            +880-199-772-2621
          </a>
        </li>
        <li>
          Email:{" "}
          <a
            className="underline underline-offset-2"
            href="mailto:himibaba10@gmail.com"
          >
            himibaba10@gmail.com
          </a>
        </li>
      </ul>
      <ContactSocialIcons />
    </div>
  );
};

export default ContactInfo;
