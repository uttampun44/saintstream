import {ReactNode, createContext, useState} from "react";

type ContextProviderProps ={
  children:ReactNode
}
interface saintStreamValue{
user: null,
token: string | null,
setToken: (token:string) => void,
setUser: (user: null) => void,
}


export const Context = createContext<saintStreamValue | null>(null);


export default function ContextProvider({children}: ContextProviderProps){
   
   const [user, setUser] = useState<null>(null)
   const [token, setToken] = useState<string | null>(null)

   return(
      <Context.Provider value={{user, token, setToken, setUser}}>
      {children}
      </Context.Provider>
   )
}
