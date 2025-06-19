import React, { useEffect, useRef } from 'react';
import { useMediaQuery,useTheme, Container, Typography, Box } from '@mui/material';
import { CONSTANTS } from '../../lib/constant';
import { motion } from 'framer-motion';
import sampleImg from '../assets/sample.svg';
import { SignInButton } from '@clerk/clerk-react';


export default function Home() {
  const pointerRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const theme = useTheme();
   const isXs = useMediaQuery(theme.breakpoints.down('md')); // Check if screen is extra small (less than 600px)
  const isSm = useMediaQuery(theme.breakpoints.between( 'md', 'lg')); // Check if screen is small (600px to 960px)


  // Track mouse inside either hero or features section
  useEffect(() => {
    const handleMouseMove = (e) => {
      const blob = pointerRef.current;
      const hero = heroRef.current;
      const features = featuresRef.current;
      if (!blob || !hero || !features) return;

      const { clientX, clientY } = e;

      const isInHero = checkInside(hero, clientX, clientY);
      const isInFeatures = checkInside(features, clientX, clientY);

      if (isInHero || isInFeatures) {
        blob.style.display = 'block';
        blob.style.left = `${clientX - 100}px`;
        blob.style.top = `${clientY - 100}px`;
      } else {
        blob.style.display = 'none';
      }
    };

    const checkInside = (el, x, y) => {
      const rect = el.getBoundingClientRect();
      return (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  const getAppTitleVariant = () => {
    if (isXs) {
      // For extra small screens (e.g., small phones), use a very small variant like 'h5' or 'h6'
      // Or you can create a custom font size in your MUI theme.
      return 'h5'; // Or even 'h6' if 'h5' is still too big
    }
    if (isSm) {
      // For small screens, 'h4' is usually appropriate
      return 'h4';
    }
    // For medium and larger screens, 'h1' as originally intended
    return 'h1';
  };

  const features = [
    {
      title: 'Instant Ordering',
      desc: 'Skip queues by ordering directly from your mobile or desktop.',
    },
    {
      title: 'Wallet Integration',
      desc: 'Use campus wallet or UPI to make secure and instant payments.',
    },
    {
      title: 'Live Menu',
      desc: 'View real-time menus with ratings, item availability, and more.',
    },
  ];

  return (
    <div className='relative overflow-hidden'>
      {/* Blob pointer tracker */}
      <div
        ref={pointerRef}
        className='pointer-events-none fixed w-48 h-48 bg-gradient-to-tr from-green-400 to-blue-500 rounded-full opacity-20 blur-3xl z-0 transition-all duration-100 hidden'
      />

      {/* Hero Section */}
      <div ref={heroRef} className='relative z-10'>
        <Container maxWidth='lg' className='pt-32 pb-24'>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className='flex flex-col md:flex-row items-center justify-between gap-10'>
              {/* Left Panel - Text */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                 <Typography
                  variant={getAppTitleVariant()} // Dynamically set variant
                  component="h1" // Ensure it renders as an h1 tag for SEO
                  sx={{
                    fontWeight: 'bold',
                    color: 'white',
                    lineHeight: 'snug', // Or a numeric value like 1.25
                    
                    whiteSpace: 'normal', // Default, but ensures no nowrap
                    overflowWrap: 'break-word', // Use this if CONSTANTS.APP_NAME has very long single words you CAN break
                                                // (e.g., if it's "AwesomeNewAppThatIsSuperLong" and you want "SuperLong" to break)
                                                // If it's a short, un-breakable name, this isn't needed.
                  }}
                >
                  Welcome to{' '}
                  <span
                    style={{
                      background: 'linear-gradient(to top right, #4CAF50, #2196F3)', // Green to Blue gradient
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {CONSTANTS.APP_NAME}
                  </span>
                </Typography>

                <p className="mt-6 text-gray-200 text-base sm:text-lg md:text-xl max-w-xl mx-auto md:mx-0">
                  {CONSTANTS.APP_DESCRIPTION}
                </p>
              </div>

              {/* Right Panel - SVG/Image with stationary blob animation */}
              <div className='w-full md:w-1/2 flex justify-center'>
                <div className='relative w-64 md:w-96'>

                  {/* Blob Animation Background */}
                  <div
                    className='absolute inset-0 -z-10 animate-blob bg-gradient-to-tr from-green-400 to-blue-500 rounded-full blur-3xl opacity-25'
                    style={{ width: '150%', height: '150%', top: '-25%', left: '-25%' }}
                  ></div>

                  {/* Image with optional blur container */}
                  <div className=' rounded-2xl p-4 relative z-10'>
                    <img
                      src={sampleImg}
                      alt='Food Ordering Illustration'
                      className='w-full h-auto'
                    />
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </Container>
      </div>


      {/* Features Section */}
      <section ref={featuresRef} className='py-24 relative'>
        <Container maxWidth='lg' className='relative z-10'>
          <Typography
            variant='h3'
            align='center'
            className='font-semibold text-3xl text-white pb-12'
          >
            Why Choose {CONSTANTS.APP_NAME}?
          </Typography>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Box className='bg-white border border-gray-100 rounded-2xl p-6 shadow-lg text-center hover:shadow-2xl cursor-pointer ease-in-out transition duration-150'>
                  <h5 className='font-bold text-xl text-gray-800 mb-2'>
                    {item.title}
                  </h5>
                  <p className='text-gray-600 text-lg'>{item.desc}</p>
                </Box>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}