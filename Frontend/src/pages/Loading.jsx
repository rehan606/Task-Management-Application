const Loading = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-gray-300 rounded-full border-t-[#010d78] animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-600 font-semibold">Loading...</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default Loading;
  