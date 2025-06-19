import React from 'react';
import { useNavigate } from 'react-router-dom';
import error from '../assets/error.svg'; // Adjust the path as necessary

function Error() {
   

  return (
     <div className="min-h-screen flex flex-col items-center justify-center p-0 text-center">
        <p className="text-white text-xl">
    The page you’re looking for doesn’t exist or has been moved.
  </p>
  <img
    src={error}
    alt="Error"
    className="w-[600px] h-auto max-w-full"
  />
  
</div>

  );
}

export default Error;
