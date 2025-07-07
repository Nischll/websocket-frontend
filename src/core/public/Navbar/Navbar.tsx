import { Link, NavLink, useNavigate } from "react-router-dom";
import reactLogo from "../../../assets/react.svg";
import { Bell, CircleUserRound } from "lucide-react";
import { useState } from "react";
import { useChatSocket } from "../../../hooks/useChatSocket";

const Navbar = () => {
  const [notificationContainer, setNotificationContainer] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const { messages } = useChatSocket("123");

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
          <div className="relative flex justify-center items-center gap-3">
            <span
              className="rounded-full relative cursor-pointer hover:bg-slate-200 p-1"
              onClick={() => setNotificationContainer((prev) => !prev)}
            >
              <Bell size={25} strokeWidth={1.5} />
              <span className="absolute top-[-5px] right-0 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                {messages.length}
              </span>
            </span>
            {notificationContainer === true && (
              <div className="flex flex-col justify-center items-start gap-2 absolute top-7 right-8 bg-slate-200 w-md py-2 rounded-md shadow-md ">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className="w-full p-2 hover:bg-slate-300 cursor-pointer"
                    onClick={() => {
                      navigate("chat");
                      setNotificationContainer(false);
                    }}
                  >
                    <p className="text-sm font-semibold">
                      From: {msg.senderId} → To: {msg.receiverId}
                    </p>{" "}
                    <p className="text-xs text-gray-600">
                      Sent at: {new Date(msg.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
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
