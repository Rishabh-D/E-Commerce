import React, { useEffect } from "react";
import "./App.css";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";

import AdminHomePage from "./pages/AdminHomePage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/AuthSlice";
import Order from "./features/order/Order";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import ProductForm from "./features/admin/components/ProductForm";
import AdminProductFormPage from "./pages/AdminProductFormPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Protected>
                <Home />
            </Protected>
        ),
    },
    {
        path: "/admin",
        element: (
            <ProtectedAdmin>
                <AdminHomePage />
            </ProtectedAdmin>
        ),
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },
    {
        path: "/cart",
        element: (
            <Protected>
                <CartPage />
            </Protected>
        ),
    },
    {
        path: "/checkout",
        element: (
            <Protected>
                <Checkout />
            </Protected>
        ),
    },
    {
        path: "/products/:id",
        element: (
            <Protected>
                <ProductDetailPage />
            </Protected>
        ),
    },
    {
        path: "/admin/products/:id",
        element: (
            <ProtectedAdmin>
                <AdminProductDetailPage />
            </ProtectedAdmin>
        ),
    },
    {
        path: "/admin/product-form",
        element: (
            <ProtectedAdmin>
                <AdminProductFormPage />
            </ProtectedAdmin>
        ),
    },
    {
        path: "/admin/product-form/edit/:id",
        element: (
            <ProtectedAdmin>
                <AdminProductFormPage />
            </ProtectedAdmin>
        ),
    },
    {
        path: "/pay",
        element: (
            <Protected>
                <Order />
            </Protected>
        ),
    },
    {
        path: "/order-success/:id",
        element: <OrderSuccessPage />,
    },
    {
        path: "/orders",
        element: <UserOrdersPage />,
    },
    {
        path: "/profile",
        element: <UserProfilePage />,
    },
    {
        path: "/logout",
        element: <Logout />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
]);

function App() {
    // dispatching fetchCartItemsByUserId here at App level.
    // as soon as user visits the site he should get to know abt his cart
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    useEffect(() => {
        console.log("from APPPPP");
        if (user) {
            dispatch(fetchItemsByUserIdAsync(user.id));
            dispatch(fetchLoggedInUserAsync(user.id));
        }
    }, [dispatch, user]);
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
