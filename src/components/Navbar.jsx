import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo white.png';
import ContactButton from '../ui/ContactButton';
import Hamburger from '../ui/Hamburger';
import NavLinks from './NavLinks';
import { useNavbar } from '../hooks/useNavbar';

const Navbar = () => {
  const { active, setActive, showMenu, setShowMenu } = useNavbar();
  return (
    <nav className='z-50 sticky top-0 backdrop-blur-xl'>
      <div className='flex items-center section justify-between'>
        <div className='sm:w-1/4'>
          <Link to='/' onClick={() => { setActive(''); window.scrollTo(0,0); }}>
            <img className='w-20 sm:w-28' src={logo} alt='Logo' />
          </Link>
        </div>

        <NavLinks active={active} setActive={setActive} showMenu={showMenu} setShowMenu={setShowMenu} />
        <ContactButton>Contact</ContactButton>
        <Hamburger showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
    </nav>
  );
};

export default Navbar;
