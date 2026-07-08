import React from 'react';
// import { Link } from 'react-router-dom'; // Uncomment if using React Router

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center text-[#FFF9FA] px-4 font-sans">
      {/* Big 404 Error Graphic */}
      <div className="relative mb-8">
        <h1 className="text-9xl font-black tracking-tight text-[#FD1843] opacity-20 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-4xl font-extrabold text-[#FFF9FA] tracking-wide uppercase">
            Track Lost
          </p>
        </div>
      </div>

      {/* Message Section */}
      <div className="text-center max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-[#FFF9FA]">
          Oops! This vault is empty.
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          The file or page you are looking for might have been moved, deleted, or the URL is incorrect. Let's head back to the dashboard.
        </p>
      </div>

      {/* Audio Wave Aesthetic Accent */}
      <div className="flex items-center space-x-1 my-8 h-8">
        <span className="w-1 bg-[#FD1843] h-4 rounded-full animate-pulse"></span>
        <span className="w-1 bg-[#FD1843] h-8 rounded-full animate-pulse delay-75"></span>
        <span className="w-1 bg-[#FFF9FA] h-5 rounded-full animate-pulse delay-150"></span>
        <span className="w-1 bg-[#FD1843] h-7 rounded-full animate-pulse delay-200"></span>
        <span className="w-1 bg-[#FFF9FA] h-3 rounded-full animate-pulse delay-300"></span>
      </div>

      {/* Action Button */}
      <a
        href="/"
        className="px-6 py-3 bg-[#FD1843] text-[#FFF9FA] font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105 tracking-wide uppercase text-sm"
      >
        Back To Vault
      </a>
    </div>
  );
};

export default PageNotFound;