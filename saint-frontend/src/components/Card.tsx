import React, { ReactNode } from "react"
import { cn } from "../utils/cn"

interface cardProps {
  className?:string,
  children:ReactNode
}
const Card:React.FC<cardProps> = ({className, children}) =>{
    return(
        <div className={cn(className)}>
            {children}
        </div>
    )
}
export default Card