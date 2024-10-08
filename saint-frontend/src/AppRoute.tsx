import { Routes, Route } from "react-router-dom";
import Signup from "./page/Signup";
import Login from "./page/Login";

export default function AppRoute(){
    return(
       <Routes>
          <Route path="/sign-up" element={<Signup />}></Route>
          <Route path="/" element={<Login />}></Route>
       </Routes>
    )
}