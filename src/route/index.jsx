import {
    createBrowserRouter,
    
  } from "react-router-dom";
import App from "../App.jsx";
import Login from "../pages/Login.jsx";
// import VerifyEmail from "../pages/verifyEmail.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import VerifyOtp from "../pages/VerifyOtp.jsx";
import ConfirmNewPassword from "../pages/ConfirmNewPassword.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";
import RoleBaseRoute from "../components/RoleBaseRoute.jsx";




const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/admin-dashboard",
                element:<PrivateRoute>
                <RoleBaseRoute requiredRole="admin">
                    
                        <AdminDashboard/>
                </RoleBaseRoute>  
                </PrivateRoute>,
               

            }
        ],
    },
    {
        path:"/login",
        element:<Login/>
    },
    // {
    //     path:"/register",
    //     element:<Register/>
    // },
    // {
    //     path:"/verify-email",
    //     element:<VerifyEmail/>
    // },
    {
        path:"/forgot-password",
        element:<ForgotPassword/>
    },
    {
        path:"/verify-otp",
        element:<VerifyOtp/>
    },
    {
        path:"/password-reset",
        element:<ConfirmNewPassword/>
    }

])

export default router;
