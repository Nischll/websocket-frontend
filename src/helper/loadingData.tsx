import logo from "../assets/react.svg";

export const LoadingData = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="relative w-24 h-24 p-2">
        <div className="absolute inset-0 w-full h-full border-3 border-gray-300 border-t-blue-300 rounded-full animate-spin"></div>
        <img src={logo} alt="User" className="w-full h-full object-contain" />
      </div>
      <p className="text-lg font-medium text-gray-700">
        Loading, please wait...
      </p>
    </div>
  );
};
