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
      activeLinks = [...publicLinks, { name: 'Profile', path: '/user-form' }];
    }
  }

  return (
    <div className='fixed top-0 left-0 w-full z-50'>
      <div className='m-4'>
        <nav className='rounded-3xl bg-white border border-gray-200 shadow-sm px-4 py-2'>
          <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-2 py-2'>
            {/* Logo */}
            <Link
              to='/'
              className='text-3xl font-extrabold text-black tracking-tight hover:tracking-wide transition-all duration-300'
            >
              {CONSTANTS.APP_NAME}
            </Link>

            {/* Mobile Toggle Button */}
            <button
              onClick={toggleMenu}
              type='button'
              className='md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 focus:outline-none transition'
              aria-label='Toggle menu'
            >
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
              className={`w-full md:w-auto transition-all duration-300 ease-in-out ${
                isOpen ? 'block' : 'hidden'
              } md:flex md:items-center md:space-x-5`}
              id='navbar-default'
            >
              <ul className='font-medium flex flex-col md:flex-row mt-4 md:mt-0 text-black md:items-center gap-y-2 md:gap-y-0 gap-x-4'>
                {activeLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 px-4 rounded-md text-center md:text-left transition-all duration-200 ${
                        location.pathname === link.path
                          ? 'bg-black text-white'
                          : 'hover:bg-black hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                <li className='mt-2 md:mt-0'>
                  {isSignedIn ? (
                    <div className='flex justify-center md:justify-start'>
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
                        <Button
                          fullWidth
                          variant='contained'
                          className='bg-gradient-to-tr from-green-400 to-blue-500 text-black'
                        >
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
