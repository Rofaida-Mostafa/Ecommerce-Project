import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Register from "./component/regester/Register";
import Layout from "./component/layout/Layout";
import Login from "./component/login/Login";
import NF from "./component/Not _Found/NF";
import Home from "./component/home/Home";
import AuthContext from "./context/AuthContext";
// import Category from "./component/category/Category";
import Cart from "./component/cart/Cart";
import Brands from "./component/Brands/Brands";
import ProtectedRoute from "./component/Guard/protectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
// import Products from "./component/products/Products";
import ProductDetails from "./component/productDetails/ProductDetails";
import CartContext from "./context/CardContext";
import { Toaster } from "react-hot-toast";
import Payment from "./component/payment/Payment";
import ForgotPassword from "./component/forgot/ForgotPassword";
import ResetPassword from "./component/reset/ResetPassword";
import VerifyResetCode from "./component/verify/VerifyResetCode";
import FavouriteContextProvider from "./context/FavProductsContext";
import FavouriteProducts from "./component/FavouriteProducts/FavouriteProducts";
import { Offline } from "react-detect-offline";

import { lazy, Suspense } from "react";
import AllOrders from "./component/AllOrders/AllOrders";
import ProtectedRouteAuth from "./component/Guard/protectRouteAuth";
const Products = lazy(() => import("./component/products/Products"));
const Category = lazy(() => import("./component/category/Category"));

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <ProtectedRouteAuth><Register /></ProtectedRouteAuth>  },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Suspense>
              <Products />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "signUp",
        element: (
          <ProtectedRouteAuth>
            {" "}
            <Register />{" "}
          </ProtectedRouteAuth>
        ),
      },
      {
        path: "signIn",
        element: (
          <ProtectedRouteAuth>
            <Login />
          </ProtectedRouteAuth>
        ),
      },
      {
        path: "forgot",
        element: <ForgotPassword />,
      },
      {
        path: "verify",
        element: <VerifyResetCode />,
      },
      {
        path: "reset",
        element: <ResetPassword />,
      },
      {
        path: "category",
        element: (
          <ProtectedRoute>
            <Suspense>
              {" "}
              <Category />{" "}
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <FavouriteProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "Brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "det/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: (
          <ProtectedRoute>
            <NF />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const reactClientConfig = new QueryClient();

export default function App() {
  return (
    <>
      <AuthContext>
        <QueryClientProvider client={reactClientConfig}>
          <CartContext>
            <FavouriteContextProvider>
              <RouterProvider router={router} />
              <Toaster />
              <Offline>
                <div className="bg-black text-white text-center fixed top-[15vh] left-5 rounded-2xl p-3">
                  Internet corrupted
                </div>
              </Offline>
            </FavouriteContextProvider>
          </CartContext>
        </QueryClientProvider>
      </AuthContext>
    </>
  );
}
