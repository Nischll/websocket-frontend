import reactLogo from "../assets/react.svg";

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-700 bg-transparent backdrop-blur-md">
      {/* <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium">Loading, please wait...</p> */}

      <div className="relative w-24 h-24 p-2">
        <div className="absolute inset-0 w-full h-full border-2 border-gray-300 border-t-blue-300 rounded-full animate-spin"></div>
        <img src={reactLogo} alt="User" className="w-full h-full object-contain" />
      </div>
    </div>
  );
};
