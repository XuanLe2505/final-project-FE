import React from "react";
import { Route, Routes } from "react-router-dom";
import ActivationEmail from "../pages/ActivationEmailPage";
import useAuth from "../hooks/useAuth";
import AdminLayout from "../layouts/AdminLayout";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import CheckoutCompletedPage from "../pages/CheckoutCompletedPage";
import CheckoutPage from "../pages/CheckoutPage";
import DetailOrderPage from "../pages/DetailOrderPage";
import DetailProduct from "../pages/DetailProduct";
import HomePage from "../pages/HomePage";
import HomePageAdmin from "../pages/HomePageAdmin";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import Products from "../pages/Products";
import RegisterPage from "../pages/RegisterPage";
import UserOrdersPage from "../pages/UserOrdersPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import UserProfilePage from "../pages/UserProfilePage";

function Router() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={user?.role === "admin" ? <AdminLayout /> : <MainLayout />}
      >
        {user?.role === "admin" ? (
          <Route index element={<HomePageAdmin />} />
        ) : (
          <>
            <Route index element={<HomePage />} />
            <Route path="/me" element={<UserProfilePage />} />
            <Route path="/orders" element={<UserOrdersPage />} />
            <Route path="/orders/:orderId" element={<DetailOrderPage />} />
            <Route path="/:category" element={<Products />} />
            <Route path="/products/:productId" element={<DetailProduct />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/checkout/completed"
              element={<CheckoutCompletedPage />}
            />
            <Route
              path="/user/activate/:activationToken"
              element={<ActivationEmail />}
            />
            <Route
              path="/user/reset/:accessToken"
              element={<ResetPasswordPage />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot" element={<ForgotPasswordPage />} />
          </>
        )}
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
