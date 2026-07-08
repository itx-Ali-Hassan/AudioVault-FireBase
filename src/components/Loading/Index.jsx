import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center text-[#FFF9FA] px-4 font-sans">
      
      {/* Container for Animation and Text */}
      <div className="flex flex-col items-center space-y-6">
        
        {/* Animated Audio Equalizer / Wave */}
        <div className="flex items-end justify-center space-x-1.5 h-16 w-32">
          {/* Bar 1 */}
          <span className="w-1.5 bg-[#FD1843] rounded-full animate-[bounce_1s_infinite_100ms] h-12"></span>
          {/* Bar 2 */}
          <span className="w-1.5 bg-[#FFF9FA] rounded-full animate-[bounce_1s_infinite_300ms] h-16"></span>
          {/* Bar 3 */}
          <span className="w-1.5 bg-[#FD1843] rounded-full animate-[bounce_1s_infinite_500ms] h-8"></span>
          {/* Bar 4 */}
          <span className="w-1.5 bg-[#FFF9FA] rounded-full animate-[bounce_1s_infinite_200ms] h-14"></span>
          {/* Bar 5 */}
          <span className="w-1.5 bg-[#FD1843] rounded-full animate-[bounce_1s_infinite_400ms] h-10"></span>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold tracking-wider text-[#FFF9FA] uppercase animate-pulse">
            Tuning In...
          </h3>
          <p className="text-gray-400 text-xs tracking-wide">
            Accessing your Audio Vault
          </p>
        </div>

      </div>
    </div>
  );
};

export default Loading;