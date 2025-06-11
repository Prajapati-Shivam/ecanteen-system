import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONSTANTS } from '../../lib/constant';
import {
  useUser,
  UserButton,
  SignedOut,
  SignInButton,
} from '@clerk/clerk-react';
import { Button } from '@mui/material';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isSignedIn } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const publicLinks = [
    { name: 'Contact', path: '/contact' },
    { name: 'About', path: '/about' },
  ];

  const isAdmin = isSignedIn && user?.publicMetadata?.role === 'admin';
  
    const authLinks = isAdmin ? [
      { name: 'Food Panel', path: '/food' },
      { name: 'Dashboard', path: '/dashboard' },
    ] :  [
      { name: 'Browse', path: '/browse' },
      { name: 'Orders', path: '/orders' },
      { name: 'Cart', path: '/cart' }
    ];

  return (
    <div className='fixed top-0 left-0 w-full z-50'>
      <div className='m-4'>
        <nav className='rounded-3xl bg-gray-50 border border-gray-200 shadow-sm px-4 py-2'>
          <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-2 py-2'>
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
              <span className='sr-only'>Toggle menu</span>
              {isOpen ? (
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
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
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
              )}
            </button>

            {/* Nav Links */}
            <div
              className={`w-full md:block md:w-auto transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'
                }`}
              id='navbar-default'
            >
              <ul className='font-medium flex flex-col md:flex-row md:space-x-5 mt-4 md:mt-0 text-black'>
                {/* Public Links */}
                {publicLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 px-4 rounded transition-all duration-300 ${location.pathname === link.path
                          ? 'bg-black text-white'
                          : 'hover:bg-black hover:text-white'
                        }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                {/* Authenticated Links */}
                {isSignedIn &&
                  authLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`block py-2 px-4 rounded transition-all duration-300 ${location.pathname === link.path
                            ? 'bg-black text-white'
                            : 'hover:bg-black hover:text-white'
                          }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}

                {/* Auth Buttons */}
                <li>
                  {isSignedIn ? (
                    <UserButton
                      userProfileMode='navigation'
                      appearance={{
                        elements: {
                          userButtonAvatarBox: 'w-10 h-10',
                          userButtonAvatarImage: 'w-10 h-10 rounded-full',
                        },
                      }}
                    />
                  ) : (
                    <SignedOut>
                      <SignInButton
                        mode='modal'
                        fallbackRedirectUrl='/user-form'
                      >
                        <Button variant='contained' color='primary'>
                          Login
                        </Button>
                      </SignInButton>
                    </SignedOut>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
