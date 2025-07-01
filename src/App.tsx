import { Suspense } from "react";
import "./App.css";
import { Loader } from "./helper/loader";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { publicRoutes } from "./core/routes/publicRoutes";

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={createBrowserRouter(publicRoutes)} />
      </Suspense>
    </>
  );
}

export default App;
