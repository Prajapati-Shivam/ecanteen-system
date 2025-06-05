import React from 'react';
import { CONSTANTS } from '../../lib/constant';

function Footer() {
  return (
    <footer className='bg-white text-black py-10 border-t border-gray-200'>
      <div className='max-w-screen-xl mx-auto px-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
          {/* About E-Canteen */}
          <div>
            <h3 className='text-xl font-semibold mb-4'>{CONSTANTS.APP_NAME}</h3>
            <p className='text-gray-700'>{CONSTANTS.APP_DESCRIPTION}</p>
          </div>

          {/* Services */}
          <div>
            <h3 className='text-xl font-semibold mb-4'>Services</h3>
            <ul className='space-y-2 text-gray-700'>
              <li>
                <a href='#menu' className='hover:text-green-600'>
                  View Menu
                </a>
              </li>
              <li>
                <a href='#order' className='hover:text-green-600'>
                  Order Food
                </a>
              </li>
              <li>
                <a href='#recharge' className='hover:text-green-600'>
                  Wallet Recharge
                </a>
              </li>
              <li>
                <a href='#feedback' className='hover:text-green-600'>
                  Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Use */}
          <div>
            <h3 className='text-xl font-semibold mb-4'>For Institutions</h3>
            <ul className='space-y-2 text-gray-700'>
              <li>
                <a href='#college-setup' className='hover:text-green-600'>
                  College Integration
                </a>
              </li>
              <li>
                <a href='#corporate-setup' className='hover:text-green-600'>
                  Office Setup
                </a>
              </li>
              <li>
                <a href='#vendor' className='hover:text-green-600'>
                  Become a Vendor
                </a>
              </li>
              <li>
                <a href='#support' className='hover:text-green-600'>
                  Support & Help
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className='text-xl font-semibold mb-4'>Contact Us</h3>
            <p className='text-gray-700'>Email: support@ecanteen.in</p>
            <p className='text-gray-700'>Phone: +91-98765-43210</p>
            <p className='text-gray-700 mt-2'>
              Available: Mon - Sat, 9AM - 6PM
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='mt-10 border-t border-gray-300 pt-5 text-center'>
          <p className='text-sm text-gray-600'>
            &copy; {new Date().getFullYear()} E-Canteen. Built for smarter
            campus and workplace dining.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
