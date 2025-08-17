import React from "react";
import Heading from "../ui/Heading";
import ContactSocialIcons from "./ContactSocialIcons";

const ContactInfo = () => {
  return (
    <div className="w-full sm:w-1/2">
      <Heading className="text-6xl text-secondary mb-5">
        Let's Have a Chitchat!
      </Heading>
      <p className="text-lg">
        Everyday I am learning new technologies and improving my coding skills.
      </p>
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
