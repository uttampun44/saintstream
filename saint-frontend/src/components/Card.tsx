import React, { ReactNode } from "react"
import { cn } from "../utils/cn"

interface cardProps {
  className:string,
  children:ReactNode
}
const Card:React.FC<cardProps> = ({className, children}) =>{
    return(
        <div className={cn("card max-w-96 w-max", className)}>
            {children}
        </div>
    )
}
export default Card