import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { WebSocketProvider } from "../../components/ContextApi/WebSocketProvider/WebSocketProvider";

const Layout = lazy(() => import("../public/Layout"));
const Home = lazy(() => import("../public/Home/Home"));
const ChatRoom = lazy(() => import("../public/ChatRoom/ChatRoom"));
const AboutUs = lazy(() => import("../public/AboutUs/AboutUs"));

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <WebSocketProvider>
        <Layout />
      </WebSocketProvider>
    ),
    errorElement: (
      <>
        <div>Error</div>
      </>
    ),
    children: [
      {
        index: true,
        // path: "home",
        element: <Home />,
      },
      // {
      //   // index: true,
      //   path: "home",
      //   element: <Home />,
      // },
      {
        path: "chat",
        element: <ChatRoom />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
    ],
  },
];
