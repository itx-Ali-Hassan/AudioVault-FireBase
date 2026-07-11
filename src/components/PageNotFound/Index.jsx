import { Link} from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center text-myWhite px-4 font-sans">
      {/* Big 404 Error Graphic */}
      <div className="relative mb-8">
        <h1 className="text-9xl font-black tracking-tight text-myPink opacity-20 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-4xl font-extrabold text-myWhite tracking-wide uppercase">
            Track Lost
          </p>
        </div>
      </div>

      {/* Message Section */}
      <div className="text-center max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-myWhite">
          Oops! This vault is empty.
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          The file or page you are looking for might have been moved, deleted, or the URL is incorrect. Let's head back to the dashboard.
        </p>
      </div>

      {/* Audio Wave Aesthetic Accent */}
      <div className="flex items-center space-x-1 my-8 h-8">
        <span className="w-1 bg-myPink h-4 rounded-full animate-pulse"></span>
        <span className="w-1 bg-myPink h-8 rounded-full animate-pulse delay-75"></span>
        <span className="w-1 bg-myWhite h-5 rounded-full animate-pulse delay-150"></span>
        <span className="w-1 bg-myPink h-7 rounded-full animate-pulse delay-200"></span>
        <span className="w-1 bg-myWhite h-3 rounded-full animate-pulse delay-300"></span>
      </div>

      {/* Action Button */}
      <Link to='/' className="px-6 py-3 bg-myPink text-myWhite font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105 tracking-wide uppercase text-sm">Back To Home Page</Link>
    </div>
  );
};

export default PageNotFound;