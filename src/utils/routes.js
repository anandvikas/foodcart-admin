//non-private ---------------------------------------
import SignUp from "../components/Auth/SignUp"
import Login from "../components/Auth/Login"
import ForgotPass from "../components/Auth/ForgotPass"
import Otp from "../components/Auth/Otp"
import ResetPass from "../components/Auth/ResetPass"

//private -------------------------------------------
import Dashboard from "../components/Dashboard/Dashboard"

//user ---------------------------------------------
import addUser from "../components/User/Add"
import viewAllUser from "../components/User/ViewAll"
import ViewOneUser from "../components/User/ViewOne"

//product ---------------------------------------------
import addProduct from "../components/Product/Add"
import viewAllProduct from "../components/Product/ViewAll"
import ViewOneProduct from "../components/Product/ViewOne"


//test ---------------------------------------------
import Table from "../components/Table/Table"
// import ViewOne from "../components/User/ViewOne"

export const privateRoutes = [
    {path:"/", component:Dashboard},

    {path:"/user", component:viewAllUser},
    {path:"/user/add", component:addUser},
    {path:"/user/:userId", component:ViewOneUser},

    {path:"/product", component:viewAllProduct},
    {path:"/product/add", component:addProduct},
    {path:"/product/:productId", component:ViewOneProduct},


    // {path:"/test", component:Table},
]

export const nonPrivateRoutes = [
    {path:"/", component:Login},
    {path:"/signup", component:SignUp},
    {path:"/forgotPassword", component:ForgotPass},
    {path:"/otp", component:Otp},
    {path:"/resetPass", component:ResetPass},
]
