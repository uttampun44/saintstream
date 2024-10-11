import { cn } from "../utils/cn";
import Button from "./Button";

export default function Header(){
    return(
        <div className="header max-w-[1440px] mx-auto flex justify-between items-center p-5">
            <div className="logo flex items-center gap-x-5">
               <img src="/public/images/Logo.png" />
               <h1 className={cn("text-2xl text-black font-sans font-bold")}>SaintStream</h1>
            </div>
            <div className="logoutBtn">
                <Button type="submit" name="Logout" value="logout" />
            </div>

        </div>
    )
}