import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 bg-white flex items-center justify-center p-8">
        <div>
          <h1 className="text-4xl md:text-6xl text-blue-700 font-bold mb-4">Welcome to KITE-EEDU</h1>
          <p className="text-gray-700 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
            ipsum vel augue tincidunt bibendum.
          </p>
          <button className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Explore Course
          </button>
        </div>
      </div>
      <div className="md:w-1/2 bg-white flex items-center justify-center">
        <img
          src="/edu.png"
          alt="Hero Image"
          className="max-w-3/4 h-auto md:max-w-2/3 md:h-[500px]"
        />
      </div>
    </div>
  );
};

export default LandingPage;