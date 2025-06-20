import React from 'react';

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-12 h-12 border-4 border-violet-600  border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
