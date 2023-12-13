import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";

import { Detail } from "./pages/Details";
import { Layout } from "./components/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/products/:id",
        element: <Detail />
      }
    ]
  }
])

export {router}