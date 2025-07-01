import { lazy } from "react";
import { Outlet } from "react-router-dom";

const Navbar = lazy(() => import("./Navbar/Navbar"));

const Layout = () => {
  return (
    <>
      <div className="h-screen relative flex flex-col py-2">
        <Navbar />
        <div className="mt-[72px] mx-3 p-2 overflow-y-auto h-full border border-gray-300 rounded-md shadow-lg">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
