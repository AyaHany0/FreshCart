import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import PasswordForm from "./Components/PasswordForm/PasswordForm";
import VerifyCode from "./Components/PasswordForm/VerifyCode";
import Register from "./Components/Register/Register";
import LayOut from "./Components/LayOut/LayOut";
import { Home } from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Products from "./Components/Products/Products";
import NotFound from "./Components/NotFound/NotFound";
import ResetPassword from "./Components/PasswordForm/ResetPassword";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProtectAuthRoutes from "./Components/ProtectAuthRoutes/ProtectAuthRoutes";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ShippingAddress from "./Components/Shipping/ShippingAddress";
import Wishlist from "./Components/Wishlist/Wishlist";
import Allorders from "./Components/AllOrders/Allorders";
import Profile from "./Components/Profile/Profile";
import CartContextProvider from "./Context/CartContext";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();

  let router = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectAuthRoutes>
              <Login />
            </ProtectAuthRoutes>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectAuthRoutes>
              <Register />
            </ProtectAuthRoutes>
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
              <Allorders />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },

        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "shippingaddress/:cartId",
          element: (
            <ProtectedRoute>
              <ShippingAddress />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "passwordform",
          element: (
            <ProtectAuthRoutes>
              <PasswordForm />
            </ProtectAuthRoutes>
          ),
        },
        {
          path: "verifycode",
          element: (
            <ProtectAuthRoutes>
              <VerifyCode />{" "}
            </ProtectAuthRoutes>
          ),
        },
        {
          path: "resetpassword",
          element: (
            <ProtectAuthRoutes>
              <ResetPassword />
            </ProtectAuthRoutes>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <CartContextProvider>
          <AuthContextProvider>
            <RouterProvider router={router}></RouterProvider>
          </AuthContextProvider>
        </CartContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
