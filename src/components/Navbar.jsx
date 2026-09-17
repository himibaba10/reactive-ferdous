import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import { useNavbar } from '../hooks/useNavbar';
import ContactButton from '../ui/ContactButton';
import Hamburger from '../ui/Hamburger';
import NavLinks from './NavLinks';

const Navbar = () => {
  const { active, setActive, showMenu, setShowMenu } = useNavbar();
  return (
    <nav className='z-50 sticky top-0 backdrop-blur-xl py-3.5'>
      <div className='flex items-center section justify-between'>
        <div className='sm:w-1/4'>
          <Link
            to='/'
            onClick={() => {
              setActive('');
              window.scrollTo(0, 0);
            }}
          >
            <img className='w-32 sm:w-44' src={logo} alt='Logo' />
          </Link>
        </div>

        <div className='flex items-center gap-10'>
          <NavLinks
            active={active}
            setActive={setActive}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
          <div className='max-sm:hidden'>
            <ContactButton>Contact</ContactButton>
          </div>
        </div>
        <Hamburger showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
    </nav>
  );
};

export default Navbar;
