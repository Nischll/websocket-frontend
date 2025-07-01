import { Link, NavLink } from "react-router-dom";
import reactLogo from "../../../assets/react.svg";
import { Bell, CircleUserRound } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <nav className="fixed w-full h-16 text-black px-3 z-10">
        <div
          className={`h-12 sm:h-16 flex flex-row justify-between items-center`}
        >
          <Link to="/">
            <div className="h-12 w-12">
              <img
                src={reactLogo}
                className="h-full w-full object-contain"
                alt="Logo"
              />
            </div>
          </Link>
          <div className="flex items-center gap-10">
            {[
              { name: "Home", to: "/" },
              { name: "Messages", to: "/chat" },
              { name: "About Us", to: "/about-us" },
            ].map(({ name, to }) => (
              <NavLink
                key={name}
                to={to}
                className={({ isActive }) =>
                  `relative text-sm sm:text-base transition-colors duration-300 
              pb-1 border-b-2 ${
                isActive
                  ? "border-b-black text-black"
                  : "border-b-transparent text-gray-500 hover:text-black"
              }`
                }
              >
                {name}
              </NavLink>
            ))}
          </div>
          <div className="flex justify-center items-center gap-3">
            <span className="rounded-full relative">
              <Bell size={25} strokeWidth={1.5} />
              <span className="absolute top-[-10px] right-0 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </span>
            <span className="rounded-full">
              <CircleUserRound size={25} strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
