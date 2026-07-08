const Loading = ({ title = 'Tuning In...', body = 'Accessing your Audio Vault' }) => {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center text-[#FFF9FA] px-4 font-sans select-none">

      {/* Container for Animation and Text - Pure Center Aligned */}
      <div className="flex flex-col items-center space-y-10">

        {/* Maximum Thickness & Center Aligned Audio Equalizer */}
        <div className="flex items-center justify-center space-x-2.5 h-24 w-auto">
          {/* Bar 1 */}
          <span className="w-2 bg-[#FD1843] rounded-full animate-[bounce_0.8s_infinite_100ms] h-12"></span>
          {/* Bar 2 */}
          <span className="w-2 bg-[#FFF9FA] rounded-full animate-[bounce_0.8s_infinite_300ms] h-20"></span>
          {/* Bar 3 */}
          <span className="w-2 bg-[#FD1843] rounded-full animate-[bounce_0.8s_infinite_500ms] h-10"></span>
          {/* Bar 4 */}
          <span className="w-2 bg-[#FFF9FA] rounded-full animate-[bounce_0.8s_infinite_200ms] h-16"></span>
          {/* Bar 5 */}
          <span className="w-2 bg-[#FD1843] rounded-full animate-[bounce_0.8s_infinite_400ms] h-14"></span>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2.5">
          <h3 className="text-2xl font-black tracking-widest text-[#FD1843] uppercase animate-pulse">
            {title}
          </h3>
          <p className="text-gray-400 text-sm tracking-wider font-medium opacity-80">
            {body}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Loading;