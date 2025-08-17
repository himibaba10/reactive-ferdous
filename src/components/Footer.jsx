import React from "react";

const Footer = () => (
  <footer className="text-sm sm:text-base text-center bg-secondary text-black py-3">
    Copyright©{new Date().getFullYear("YYYY")}, Made by{" "}
    <span className="font-semibold">Ferdous Ahmed</span>
  </footer>
);

export default Footer;
