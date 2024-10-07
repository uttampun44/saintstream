import { Routes, Route } from "react-router-dom";
import Signup from "./page/Signup";

export default function AppRoute(){
    return(
       <Routes>
          <Route path="/sign-up" element={<Signup />}></Route>
       </Routes>
    )
}