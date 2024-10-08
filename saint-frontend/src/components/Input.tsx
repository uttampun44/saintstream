import React, { forwardRef } from "react";

type inputType = "text" | "password" | "number" | "checkbox";
interface inputProps{
    type: inputType,
    value?: string,
    placeholder?:string,
    name?:string,
    className?:string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputType = forwardRef<HTMLInputElement, inputProps>(({type, value, placeholder, name, className, onChange, ...rest}, ref) => {
 return(
    <>
        <input {...rest} ref={ref} name={name} type={type} value={value} placeholder={placeholder} className={className} onChange={onChange} />
    </>
 )
});
export default InputType