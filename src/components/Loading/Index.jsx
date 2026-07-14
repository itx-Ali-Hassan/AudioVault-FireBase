const Loading = ({ title, body }) => {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center text-myWhite px-4 font-sans select-none">

      <div className="flex flex-col items-center space-y-10">

        <div className="flex items-center justify-center space-x-2.5 h-24 w-auto">
          <span className="w-2 bg-myPink rounded-full animate-[bounce_0.8s_infinite_100ms] h-12"></span>
          <span className="w-2 bg-myWhite rounded-full animate-[bounce_0.8s_infinite_300ms] h-20"></span>
          <span className="w-2 bg-myPink rounded-full animate-[bounce_0.8s_infinite_500ms] h-10"></span>
          <span className="w-2 bg-myWhite rounded-full animate-[bounce_0.8s_infinite_200ms] h-16"></span>
          <span className="w-2 bg-myPink rounded-full animate-[bounce_0.8s_infinite_400ms] h-14"></span>
        </div>

        <div className="text-center space-y-2.5">
          <h3 className="text-2xl font-black tracking-widest text-myPink uppercase animate-pulse">
            {title}
          </h3>
          <p className="text-gray-400 text-sm tracking-wider font-medium opacity-80 capitalize">
            {body}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Loading;