import {ReactNode, createContext, useState} from "react";

type ContextProviderProps ={
  children:ReactNode
}
interface saintStreamValue{
user: null,
token: null,
setToken: (token:null) => void,
setUser: (user: null) => void,
}


export const Context = createContext<saintStreamValue | null>(null);


export default function ContextProvider({children}: ContextProviderProps){
   
   const [user, setUser] = useState<null>(null)
   const [token, setToken] = useState<null>(null)

   if(!user)  return


   return(
      <Context.Provider value={{user, token, setToken, setUser}}>
      {children}
      </Context.Provider>
   )
}
