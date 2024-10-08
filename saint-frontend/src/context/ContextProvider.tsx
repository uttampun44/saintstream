import {ReactNode, createContext, useState} from "react";

type ContextProviderProps ={
  children:ReactNode
}
interface saintStreamValue{
user: null,
setUser: (user: null) => void,
}


export const Context = createContext<saintStreamValue | null>(null);


export default function ContextProvider({children}: ContextProviderProps){
   
   const [user, setUser] = useState<null>(null)

   if(!user)  return


   return(
      <Context.Provider value={{user, setUser}}>
      {children}
      </Context.Provider>
   )
}
