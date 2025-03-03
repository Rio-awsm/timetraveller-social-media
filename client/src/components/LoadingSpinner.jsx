import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      <p className="mt-4 text-indigo-600 font-medium">Traveling through time...</p>
    </div>
  );
};

export default LoadingSpinner;