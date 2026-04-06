import { createHashRouter } from "react-router-dom";
import MainLayout from "../Components/MainLayout";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Products from "../Pages/Products";
import ProductDetail from "../Pages/ProductDetail";
import Cart from "../Pages/Cart";
import Wishlist from "../Pages/Wishlist";
import Profile from "../Pages/Profile";
import NotFound from "../Pages/NotFound";

export const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductDetail /> },
      { path: "/cart", element: <Cart /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);