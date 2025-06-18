import React, { useEffect, useRef } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { CONSTANTS } from '../../lib/constant';
import { motion } from 'framer-motion';
import sampleImg from '../assets/sample.svg';
  import { SignInButton } from '@clerk/clerk-react';


export default function Home() {
  const pointerRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

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
      {/* <div ref={heroRef} className='relative z-10'>
        <Container maxWidth='lg' className='pt-32 pb-24'>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant='h1'
              align='center'
              className='mt-4 font-bold text-4xl md:text-7xl text-white leading-snug'
            >
              Welcome to{' '}
              <span className='bg-clip-text text-transparent bg-gradient-to-tr from-green-400 to-blue-500'>
                {CONSTANTS.APP_NAME}
              </span>
            </Typography>

            <p className='mt-6 text-gray-200 text-lg md:text-xl mx-auto max-w-2xl text-center'>
              {CONSTANTS.APP_DESCRIPTION}
            </p>

            <Box className='mt-10 flex justify-center gap-4'>
              <Button
                variant='contained'
                size='large'
                className='bg-gradient-to-tr from-green-500 to-blue-600 text-white px-6 shadow-md hover:scale-105 transition-transform'
              >
                Get Started
              </Button>
               
            </Box>
          </motion.div>
        </Container>
      </div> */}

        {/* Hero Section */}
<div ref={heroRef} className='relative z-10'>
  <Container maxWidth='lg' className='pt-32 pb-24'>
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className='flex flex-col-reverse md:flex-row items-center justify-between gap-10'>
        {/* Left Panel - Text */}
        <div className='w-full md:w-1/2 text-center md:text-left'>
          <Typography
            variant='h1'
            className='font-bold text-4xl md:text-6xl text-white leading-snug'
          >
            Welcome to{' '}
            <span className='bg-clip-text text-transparent bg-gradient-to-tr from-green-400 to-blue-500'>
              {CONSTANTS.APP_NAME}
            </span>
          </Typography>

          <p className='mt-6 text-gray-200 text-lg md:text-xl max-w-xl'>
            {CONSTANTS.APP_DESCRIPTION}
          </p>

          <Box className='mt-8 flex justify-center md:justify-start gap-4'>
{/*            
<SignInButton mode='modal' >
  <Button
    variant='contained'
    size='large'
    className='bg-gradient-to-tr from-green-500 to-blue-600 text-white px-6 shadow-md hover:scale-105 transition-transform'
  >
    Get Started
  </Button>
</SignInButton> */}

             
          </Box>
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
    <div className='backdrop-blur-sm rounded-2xl p-4 relative z-10'>
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
