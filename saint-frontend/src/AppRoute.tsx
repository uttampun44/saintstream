import { Routes, Route } from "react-router-dom";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Home from "./page/Home";
import { useContext } from "react";
import { Context } from "./context/ContextProvider";

export default function AppRoute(){

   const bearerToken = useContext(Context);

    return(
       <Routes>
          <Route path="/sign-up" element={<Signup />}></Route>
          <Route path="/" element={<Login />}></Route>
          {
            bearerToken?.token ? (
               <Route path="/home" element={<Home />}></Route>
            ): (
               <Route path="/" element={<Login />}></Route>
            )
          }
       </Routes>
    )
}