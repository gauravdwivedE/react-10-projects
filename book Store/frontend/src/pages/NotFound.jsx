import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200 text-base-content">
      <h1 className="text-9xl font-extrabold text-pink-500 dark:text-pink-400">
        404
      </h1>
      <p className="text-2xl md:text-3xl mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <p className="text-center mt-2">
        You might have mistyped the URL or the page has been moved.
      </p>
      <Link
        to="/"
        className="btn  mt-6 bg-black text-white border-none"
      >
        Go Back Home
      </Link>
     
    </div>
  );
};

export default NotFound;
