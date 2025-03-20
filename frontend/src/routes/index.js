import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SingUp from "../pages/SingUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";
import AllOrders from "../pages/AllOrders";

const router = createBrowserRouter([
    {
        path: "/",
        // reletive component
        element: <App/>,
        // children of reletive component "<Outlet /> in App.js"
        children: [
            {
                path: "",
                element: <Home/>
            },
            // login
            {
                path: "login",
                element: <Login/>
            },
            // forgot password
            {
                path: "forgot-password",
                element: <ForgotPassword/>
            },
            // sing up
            {
                path: "sign-up",
                element: <SingUp/>
            },
            // cart
            {
              path: 'cart',
              element: <Cart/>  
            },
            // success pay
            {
                path: "success",
                element: <Success />
            },
            // order page
            {
                path: "order",
                element: <OrderPage />
            },
            // cancel pay
            {
                path: "cancel",
                element: <Cancel />
            },
            // search product
            {
                path: "search",
                element: <SearchProduct/>
            },
            // product category and params - categoryName
            {
                path: "product-category",
                element: <CategoryProduct/>
            },
            // product details and params - id
            {
                path: "product/:id",
                element: <ProductDetails/>
            },
            // admin panel
            {
                path: "admin",
                // reletive component
                element: <AdminPanel/>,
                // children of reletive component "<Outlet /> in AdminPanel.js"
                children:[
                    // all users
                    {
                        path: "all-users",
                        element: <AllUsers/>
                    },
                    // all products
                    {
                        path: "all-products",
                        element: <AllProducts/>
                    },
                    // all orders
                    {
                        path: "all-orders",
                        element: <AllOrders/>
                    }
                ]
            }
        ]
    }
]);

export default router;