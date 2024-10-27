import { cn } from "@/utils/cn";

export default function Overlay(){
    return(
        <div className={cn("fixed w-full h-full inset-0 bg-black/90 z-30")}></div>
    )
}