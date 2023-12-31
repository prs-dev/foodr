import { createContext, useEffect } from "react";
import { useState } from "react";

export const UserContext = createContext()

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const data = localStorage.getItem("token")
        setUser(data)
    }, [user])
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

