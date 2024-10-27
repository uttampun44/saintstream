import { Link } from "react-router-dom";
import { cn } from "../utils/cn";

export default function Footer(){
    return(
        <footer className={cn("border-t-2 bg-black py-8 text-white")}>
            <div className={cn("footerContainer max-w-[1440px] mx-auto")}>
               <div className={cn("footerRow flex justify-between")}>
                  <div className={cn("footerTitle w-1/2")}>
                  <p className={cn("font-bold text-4xl")}>Our Platform is trusted by million & features best updated movies all around the world.</p>    
                  </div>
               <div className={cn("linkRow text-xl font-medium w-1/2")}>
                  <ul className={cn("flex gap-x-4 justify-end")}>
                    <li><Link to="/home" aria-label="home">Home</Link></li> 
                    <li><Link to="/home" aria-label="discover">Discover</Link></li> 
                    <li><Link to="/home" aria-label="influence">Influence</Link></li> 
                    <li><Link to="/home" aria-label="release">Release</Link></li>  
                  </ul>  
               </div>
               </div>
               <div className={cn("copyrights flex justify-between text-gray-500 text-base font-normal my-4")}>
                    <div className={cn("footerBottom w-1/2")}>
                        <ul className={cn("flex gap-x-4")}>
                            <li><Link to="#" aria-label="privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="#" aria-label="term-of-service">Term of service</Link></li>
                            <li><Link to="#" aria-label="language">Language</Link></li>
                        </ul>
                    </div>
                    <div className={cn("copyRight")}>
                        <strong>© 2024</strong>
                    </div>
               </div>
            </div>
        </footer>
    )
}