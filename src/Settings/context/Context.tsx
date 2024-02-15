import React, { SetStateAction, createContext, useState } from "react";
import { genericsType } from "../Types";
interface ContextProviderProps {
    children: React.ReactNode
}
export interface myContext {
    postsActive: genericsType<boolean>,
    setPostsActive: React.Dispatch<SetStateAction<genericsType<boolean>>>,
    postsError: boolean,
    setPostsError: React.Dispatch<SetStateAction<boolean>>
}
export const Context  = createContext<myContext | any>(null)
export const ContextProvider:React.FC<ContextProviderProps> = ({children}):JSX.Element => {
    const [postsActive, setPostsActive] = useState<genericsType<boolean>>(false)
    const [postsError, setPostsError] = useState<boolean>(false)
    const myContext:myContext = {
        postsActive, setPostsActive,
        postsError, setPostsError
    }
    return(
        <Context.Provider value={myContext}>
            {children}
        </Context.Provider>
    ) 
}