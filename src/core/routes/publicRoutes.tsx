import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { WebSocketProvider } from "../../components/ContextApi/WebSocketProvider/WebSocketProvider";

const Layout = lazy(() => import("../public/Layout"));
const Home = lazy(() => import("../public/Home/Home"));
const ChatRoom = lazy(() => import("../public/ChatRoom/ChatRoom"));
const AboutUs = lazy(() => import("../public/AboutUs/AboutUs"));
const SignUp = lazy(() => import("../public/SignUp/SignUp"));
const SignIn = lazy(() => import("../public/SignIn/SignIn"));

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      // <UnProtectedRoute>
      <WebSocketProvider>
        <Layout />
      </WebSocketProvider>
      // </UnProtectedRoute>
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
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
    ],
  },
];
