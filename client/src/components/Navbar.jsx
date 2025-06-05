import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONSTANTS } from '../../lib/constant';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Register',
      path: '/register',
    },
    {
      name: 'Login',
      path: '/login',
    },
    {
      name: 'Contact',
      path: '/contact',
    },
  ];

  return (
    <div className='sticky top-0 z-50  shadow-md backdrop-blur-sm'>
      <nav className='m-4 rounded-3xl bg-gray-50 border border-gray-200 shadow-sm'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3'>
          {/* Logo */}
          <Link
            to='/'
            className='text-3xl font-bold text-black hover:tracking-wider hover:scale-110 transition-all duration-300'
          >
            {CONSTANTS.APP_NAME}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            type='button'
            className='inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg md:hidden hover:bg-gray-200 focus:outline-none'
            aria-controls='navbar-default'
            aria-expanded={isOpen ? 'true' : 'false'}
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-6 h-6 text-black'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>

          {/* Nav Links */}
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } w-full md:block md:w-auto`}
            id='navbar-default'
          >
            <ul className='font-medium flex flex-col md:flex-row md:space-x-5 mt-4 md:mt-0 text-black'>
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className='block py-2 px-4 rounded hover:bg-black hover:text-white transition-all duration-300'
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
