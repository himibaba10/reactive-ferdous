import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="text-sm sm:text-base text-center bg-secondary text-black py-3">
    Copyright©{new Date().getFullYear("YYYY")}, Made by{" "}
    <span className="font-semibold">Ferdous Ahmed</span>
    <span className="mx-2" aria-hidden="true">
      ·
    </span>
    <Link
      to="/privacy"
      className="underline underline-offset-2 hover:opacity-70 transition-opacity"
    >
      Privacy &amp; Cookies
    </Link>
  </footer>
);

export default Footer;
