import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Home from "./page/Home";
import { useContext } from "react";
import { Context } from "./context/ContextProvider";

export default function AppRoute(){

   const bearerToken = useContext(Context);

    return(
       <Routes>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/" element={<Login />} />
         <Route path="/home" element={bearerToken?.token ? <Home /> : <Navigate to="/" />} />
       </Routes>
    )
}