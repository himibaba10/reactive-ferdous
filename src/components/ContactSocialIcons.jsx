import React from "react";
import {
  FaFacebook,
  FaLinkedinIn,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";

const ContactSocialIcons = () => {
  return (
    <div className="flex gap-4 text-2xl mt-5">
      <a href="https://www.facebook.com/ferdoushimel10" target="_blank">
        <FaFacebook />
      </a>
      <a
        href="https://www.linkedin.com/in/ferdous-ahmed-6535b0202/"
        target="_blank"
      >
        <FaLinkedinIn />
      </a>
      <a href="tg://resolve?domain=himibaba10" target="_blank">
        <FaTelegramPlane />
      </a>
      <a href="whatsapp://send?phone=+880 1997-722621" target="_blank">
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default ContactSocialIcons;
