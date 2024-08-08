import HomeLayout from "./pages/HomeLayout";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/StaticPages/PrivacyPolicy";
import TermsOfUse from "./pages/StaticPages/TermsOfUse";
import ComingSoon from "./pages/StaticPages/ComingSoon";
import NewAnnouncement from "./pages/NewAnnouncement";
import AnnouncementDetails from "./pages/AnnouncementDetails";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import UpdateAccount from "./pages/UpdateAccount";
import AnnouncementDetailsUserProfile from "./pages/AnnouncementDetailsUserProfile";
import LoadingPage from "./components/ui/LoadingPage";
import AuthLayout from "./pages/auth/AuthLayout";
import Login from "./pages/auth/Default/Login";
import LoginBusiness from "./pages/auth/Business/Login";
import Register from "./pages/auth/Default/Register";
import ResetPassword from "./pages/auth/Default/ResetPassword";
import ForgotPassword from "./pages/auth/Default/ForgotPassword";
import VerifyEmail from "./pages/auth/Default/VerifyEmail";
import ChangePassword from "./pages/auth/Default/ChangePassword";
import NotFound from "./pages/errors/NotFound";
import React from "react";
import InternalServerError from "./pages/errors/InternalServerError";
import Admin from "./pages/Admin";
import AboutUs from "./pages/AboutUs";
import PremiumAnnouncements from "./pages/PremiumAnnouncements";
import Dealerships from "./pages/Dealerships";
import RegisterBusiness from "./pages/auth/Business/Register"
import DealershipDetails from "./pages/DealershipDetails";


const routes=[
    {
        path: "/",
        element:<HomeLayout/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:'dealerships',
                element: <Dealerships/>
            },
            {
                path:'premium-announcements',
                element: <PremiumAnnouncements/>
            },
            {
                path:'privacy-policy',
                element: <PrivacyPolicy/>
            },
            {
                path:'about-us',
                element: <AboutUs/>
            },
            {
                path:'terms-of-use',
                element: <TermsOfUse/>
            },
            {
                path:'coming-soon',
                element: <ComingSoon/>
            },
            {
                path:'new-announcement',
                element:<NewAnnouncement/>,
                // auth:true
            },
            {
                path:'AnnouncementDetails/:id',
                element:<AnnouncementDetails/>
            },
            {
                path:'dealerships/:id',
                element:<DealershipDetails/>
            },
            {
                path:'profile',
                element:<Profile/>,
                auth:true
            },
            {
                path:'updateAccount',
                element:<UpdateAccount/>,
                auth:true
            },
            {
                path:'AnnouncementDetailsUserProfile/:id',
                element:<AnnouncementDetailsUserProfile/>,
                auth:true
            },

        ]

    },
    {
        path: "/loading",
        element: <LoadingPage/>
    },
    {
        path: '/auth/Default',
        element: <AuthLayout/>,
        children: [
            {
                path: 'Login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            },
            {
                path: 'reset-password',
                element: <ResetPassword/>
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword/>
            },
            {
                path: 'verifyEmail',
                element: <VerifyEmail/>
            },
            {
                path:'changePassword',
                element:<ChangePassword/>,
                auth:true
            },
        ]
    },

    {
        path: '/auth/Business',
        element: <AuthLayout/>,
        children: [
            {
                path: 'Login',
                element: <LoginBusiness/>
            },
            {
                path: 'Register',
                element: <RegisterBusiness/>
            },
        ]
    },

    {
        path: '/500',
        element: <InternalServerError/>
    },
    {
        path: '/admin',
        element: <Admin/>
    },
    {
        path: '/NotFound',
        element: <NotFound/>
    },
    {
        path: '/*',
        element: <NotFound/>
    }


]


const authMap = routes=>routes.map(route=>{
    if (route?.auth){
        route.element =<PrivateRoute>{route.element}</PrivateRoute>
    }
    if(route?.children){
        route.children=authMap(route.children);
    }
    return route;
})


export default authMap(routes);