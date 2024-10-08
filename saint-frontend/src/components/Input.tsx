import React from "react";

type inputType = "text" | "password" | "number";
interface inputProps{
    type: inputType,
    value?: string,
    placeholder?:string,
    name:string,
    className?:string
}

const InputType: React.FC<inputProps> = ({type, value, placeholder, name, className}) =>{
 return(
    <>
        <input name={name} type={type} value={value} placeholder={placeholder} className={className} />
    </>
 )
}
export default InputType