import { cn } from "../utils/cn";
import Button from "./Button";

export default function Header(){
    return(
       <div className={cn("logoContianer absolute w-full z-50")}>
         <div className={cn("header max-w-[1440px] mx-auto  p-5 flex justify-between items-center")}>
            <div className={cn("logo gap-x-5 flex items-center ")}>
               <img src="/public/images/Logo.png" />
               <h1 className={cn("text-2xl text-white font-sans font-bold")}>SaintStream</h1>
            </div>
            <div className="logoutBtn text-white">
                <Button type="submit" name="Logout" value="logout" />
            </div>

        </div>
       </div>
    )
}