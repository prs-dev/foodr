import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const RecipeContext = createContext()

export const RecipeContextProvider = ({children}) => {
    const [recipes, setRecipes] = useState([])
    const [refetch, setRefetch] = useState(false)
    useEffect(() => {
        const temp = async() => {
            try {
                const {data} = await axios.get("/recipes/all")
                setRecipes(data.recipes)
            } catch (error) {
                console.log(error)
            }
        }
        temp()
    }, [refetch])
    return (
        <RecipeContext.Provider value={{recipes, setRecipes, setRefetch}}>
            {children}
        </RecipeContext.Provider>
    )
}

