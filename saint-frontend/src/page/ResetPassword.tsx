import BackgroundImage from "../../public/images/Image.jpg";
import { cn } from "../utils/cn";

export default function ResetPassword(){
    return(
        <section
        className={cn("login_section")}
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <div className={cn("fixed w-full h-full inset-0 bg-black/90 z-30")}></div>
     </section>   
    )
}