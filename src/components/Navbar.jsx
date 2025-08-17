import { useState } from "react";
import logo from "../assets/Logo white.png";
import NavLinks from "./NavLinks";
import ContactButton from "../ui/ContactButton";
import Hamburger from "../ui/Hamburger";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="z-10 sticky top-0 backdrop-blur-xl">
      <div className="flex items-center section justify-between">
        <div className="sm:w-1/4">
          <a href="#hero" onClick={() => setActive("")}>
            <img className="w-20 sm:w-28" src={logo} alt="Logo" />
          </a>
        </div>
        <NavLinks
          active={active}
          setActive={setActive}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
        <ContactButton>Contact</ContactButton>
        <Hamburger showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
    </div>
  );
};

export default Navbar;
