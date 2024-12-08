import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh]   text-gray-800">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-blue-400 drop-shadow-lg">404</h1>
        <p className="mt-4 text-2xl font-medium text-gray-600">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="mt-2 text-md text-gray-600">
          It might have been moved or deleted.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-8 py-3 text-md font-semibold text-white bg-blue-400 rounded  hover:bg-blue-500 transition-transform transform hover:scale-105"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
