import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from "../services/authService";
import { login as loginAction, logout as logoutAction } from '../store/authSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { MdCancel } from "react-icons/md";
import { marketService } from '../services/marketService'; // Import marketService

const AccordionMenuItem = ({ item, closeMenu, isOpen, toggleOpen }) => {
  return (
    <div className="w-full">
      <div
        className="flex justify-between items-center cursor-pointer p-3"
        onClick={toggleOpen} // Toggle dropdown
      >
        <span className="text-black font-semibold">{item.label}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && item.dropdown && (
        <ul className="pl-4">
          {item.dropdown.map((subItem, index) => (
            <li key={index} className="p-2">
              <Link
                to={subItem.link}
                className="text-black hover:text-primary transition-colors"
                onClick={() => closeMenu()}
              >
                {subItem.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AccordionMenu = ({ items, closeMenu }) => {
  const [openIndex, setOpenIndex] = useState(null); // Track which accordion is open

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the clicked accordion
  };

  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        item.dropdown ? (
          <AccordionMenuItem
            key={index}
            item={item}
            closeMenu={closeMenu}
            isOpen={openIndex === index} // Check if this accordion is open
            toggleOpen={() => toggleAccordion(index)} // Toggle this accordion
          />
        ) : (
          <div key={index}>
            <Link
              to={item.link}
              className="block p-3 text-black hover:bg-gray-200"
              onClick={() => closeMenu()}
            >
              {item.label}
            </Link>
          </div>
        )
      ))}
    </div>
  );
};

const Navbar = () => {
  const mobileMenuRef = useRef(null); // Reference for the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [button, setButton] = useState('login');

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animation for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      const items = mobileMenuRef.current.querySelectorAll('li'); // Select all menu items
      gsap.from(items, {
        x: 100, // Slide from right
        opacity: 0,
        duration: 0.5,
        stagger: 0.1, // Stagger animation for each item
        ease: "power2.out",
      });
    }
  }, [isMobileMenuOpen]); // Runs the animation whenever isMobileMenuOpen changes

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(loginAction({ userData }));
          setButton('logout');
        } else {
          dispatch(logoutAction());
          setButton('login');
        }
      })
      .catch(() => {
        setButton('login');
      });
  }, [dispatch]);

  const handleButtonClick = async () => {
    if (button === 'logout') {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        toast.error("No user is currently logged in");
        return;
      }

      try {
        await authService.logout();
        dispatch(logoutAction());
        setButton('login');
        toast.success('Logged out successfully');
      } catch (error) {
        console.error('Logout failed:', error);
        toast.error('Logout failed: ' + error.message);
      }
    } else {
      navigate('/login');
    }
  };

  const handleRefreshClick = async () => {
    try {
      await marketService.refreshDatabase();
      toast.success('Database refreshed successfully');
    } catch (error) {
      console.error('Failed to refresh database:', error);
      toast.error('Failed to refresh database: ' + error.message);
    }
  };

  const navLinks = [
    {
      label: 'Service',
      dropdown: [
        { label: 'Converter', link: '/crypto-converter' },
        { label: 'Our Services', link: '/services' },
      ]
    },
    { label: 'Feature', link: '/features' },
    { label: 'Learn', 
      dropdown: [
        { label: 'News', link: '/news' },
        { label: 'Blogs', link: '/blogs' },
      ]
    },
    { label: 'Careers', link: '/careers' },
    { label: 'Refresh', link: '#', onClick: handleRefreshClick }, // Updated to Refresh with click handler
  ];

  return (
    <nav className={`bg-[#252525] w-full z-50 transition-all duration-300 ${isSticky ? 'fixed top-0 shadow-md' : 'static relative'}`} aria-label="Main Navigation">
      <div className="mx-auto container md:px-10 lg:px-2 flex items-center justify-between p-3">
        <Link to="/" aria-label="NSM Homepage">
          <img src="https://ntsmetrics.com/img/nsm-logo-blue.png" className="w-32" alt="NSM Logo" />
        </Link>
        <div className="lg:hidden block text-2xl">
          <GiHamburgerMenu size={30} color='white' onClick={() => setIsMobileMenuOpen(true)} />
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef} // Ref for GSAP animation
          className={`bg-white w-2/3 flex flex-col items-start fixed h-screen lg:hidden z-50 top-0 transition-all duration-500 ${isMobileMenuOpen ? 'right-0' : '-right-[100%]'} px-5`}
        >
          <div className='ml-auto mt-5 mb-10'>
            <MdCancel size={30} color='black' onClick={() => setIsMobileMenuOpen(false)} />
          </div>
          <AccordionMenu items={navLinks} closeMenu={() => setIsMobileMenuOpen(false)} />

          {/* Buttons */}
          <div className="flex items-center gap-5 w-full mb-5 justify-start mt-10">
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:px-4 lg:py-2 px-4 py-3 text-md button text-center select-none cursor-pointer w-1/4 lg:text-base text-sm font-semibold transition-all hover:bg-cyan-500 duration-200 outline-none text-white bg-primaryCyan rounded-[100px] shadow-[0_4px_#118baa]">
              Buy
            </button>
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:px-4 lg:py-2 px-4 py-3 text-md button text-center select-none cursor-pointer w-1/4 lg:text-base text-sm font-semibold transition-all duration-200 outline-none text-black bg-white rounded-[100px] shadow-[0_4px_#C0C0C0]">
              Sell
            </button>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="lg:flex items-center hidden text-white text-base font-semibold gap-8">
          <ul className="flex flex-row items-center gap-10">
            {navLinks.map((item, index) => (
              item.dropdown ? (
                <li key={index} className="relative group hover:text-primary transition-colors font-semibold duration-200">
                  <Link to={item.link} onClick={item.onClick}>{item.label}</Link>
                  <div className="hidden group-hover:block absolute z-10">
                    <Dropdown items={item.dropdown} />
                  </div>
                </li>
              ) : (
                <li key={index}>
                  <Link to={item.link} className="text-white" onClick={item.onClick}>{item.label}</Link>
                </li>
              )
            ))}
          </ul>
          <button onClick={handleButtonClick} className="px-4 py-3 text-md button text-center select-none cursor-pointer text-white bg-primaryCyan rounded-[100px] shadow-[0_4px_#118baa]">
            {button}
          </button>
        </div>
      </div>
    </nav>
  );
};


const Dropdown = ({ items }) => {
  return (
    <ul className="absolute top-0 w-[150px] bg-white shadow-lg rounded mt-0 p-2 z-[999]">
      {items.map((item, index) => (
        <li key={index} className="text-black transition-colors p-3 lg:hover:text-white lg:hover:bg-gray-400 rounded-lg">
          <Link to={item.link} className="block">{item.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;