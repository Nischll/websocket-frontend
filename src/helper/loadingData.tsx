// export const LoadingData = () => {
//   return (
//     <div className="flex flex-col items-center h-screen text-gray-700 bg-transparent backdrop-blur-md">
//       <p className="mt-4 text-md font-medium">Loading, please wait...</p>
//     </div>
//   );
// };
import logo from '../assets/react.svg';

export const LoadingData = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 w-full h-full border-2 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
        <img src={logo} alt="User" className="w-full h-full object-contain" />
      </div>
      <p className="text-lg font-medium text-gray-700">
        Loading, please wait...
      </p>
    </div>
  );
};
