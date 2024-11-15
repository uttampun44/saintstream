import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import Signup from "@/page/Signup";
import Login from "@/page/Login";
import Home from "@/page/Home";
import { useContext } from "react";
import { Context } from "@/context/ContextProvider";
import ForgetPassword from "@/page/ForgetPassword";
import ResetPassword from "@/page/ResetPassword";

export default function AppRoute(){

   const bearerToken = useContext(Context);

   const [searchParams] = useSearchParams();
   const token = searchParams.get("token");
 
    return(
       <Routes>
          <Route path="sign-up" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={bearerToken?.token ? <Home /> : <Navigate to="/" />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="reset-password" element={token ? <ResetPassword /> : <Navigate to="/" />}/>
       </Routes>
    )
}