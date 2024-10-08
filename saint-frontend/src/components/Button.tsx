type buttonType = "submit"| "reset"

interface buttonProps{
   type: buttonType,
   value: string,
   className?:string
   name:string
}

const Button:React.FC<buttonProps> = ({type, value, className, name}) => {
    return(
        <>
          <button type={type} value={value} className={className}>{name}</button>
        </>
    )
}
export default Button