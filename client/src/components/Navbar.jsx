import React, { useState, useEffect } from 'react';
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
  const { user, isSignedIn } = useUser();
  const location = useLocation();
  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Close the menu when the route changes
    setIsOpen(false);
  }, [location.pathname]);

  const publicLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  const studentLinks = [
    { name: 'Student', path: '/student' },
    // { name: 'My Orders', path: '/orders' },
  ];

  const adminLinks = [
    { name: 'Food Panel', path: '/food' },
    { name: 'Manage Orders', path: '/orders' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const isAdmin = isSignedIn && user?.publicMetadata?.role === 'admin';
  const isStudent = isSignedIn && user?.publicMetadata?.role === 'student';
  let activeLinks = publicLinks;
  if (isSignedIn) {
    if (isAdmin) {
      activeLinks = [...publicLinks, ...adminLinks];
    } else if (isStudent) {
      activeLinks = [...publicLinks, ...studentLinks];
    } else {
      activeLinks = [...publicLinks];
    }
  }

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

            {/* Mobile Menu Toggle */}
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
              className={`w-full md:block md:w-auto transition-all duration-300 ease-in-out ${
                isOpen ? 'block' : 'hidden'
              }`}
              id='navbar-default'
            >
              <ul className='font-medium flex flex-col md:flex-row md:space-x-5 mt-4 md:mt-0 text-black'>
                {activeLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 px-4 rounded transition-all duration-300 ${
                        location.pathname === link.path
                          ? 'bg-black text-white'
                          : 'hover:bg-black hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                <li>
                  {isSignedIn ? (
                    <div className='flex items-center space-x-5'>
                      <UserButton
                        userProfileMode='navigation'
                        appearance={{
                          elements: {
                            userButtonAvatarBox: 'w-10 h-10',
                            userButtonAvatarImage: 'w-10 h-10 rounded-full',
                          },
                        }}
                      />
                    </div>
                  ) : (
                    <SignedOut>
                      <SignInButton
                        mode='modal'
                        fallbackRedirectUrl='/user-form'
                        signUpForceRedirectUrl='/user-form'
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
