import React, { useState } from "react";

const NavLinks = ({ active, setActive, showMenu, setShowMenu }) => {
  const links = [
    { name: "About Me", url: "#about" },
    { name: "Skills", url: "#skills" },
    { name: "Portfolio", url: "#portfolio" },
  ];

  const navLinks = links.map((link) => (
    <a
      onClick={() => {
        setActive(link.name);
        setShowMenu(false);
      }}
      className={`${active === link.name ? "text-secondary" : "text-white"}`}
      key={link.url}
      href={link.url}
    >
      {link.name}
    </a>
  ));

  return (
    <>
      {/* Desktop navigation */}
      <div className="hidden sm:block w-1/2 text-center space-x-5 md:space-x-10 uppercase text-lg">
        {navLinks}
      </div>

      {/* Mobile navigation */}
      <div
        className={`${
          showMenu ? "flex" : "hidden"
        } absolute top-0 left-0 z-10 w-full min-h-screen bg-gray flex-col justify-center sm:hidden text-center space-y-5 uppercase text-2xl`}
      >
        {navLinks}
      </div>
    </>
  );
};

export default NavLinks;
