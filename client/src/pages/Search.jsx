import { Link } from 'react-router-dom'
import { RecipeContext } from '../context/RecipeContext'
import { useContext, useEffect, useState } from "react"

const Search = () => {
    const { recipes } = useContext(RecipeContext)
    const [temp, setTemp] = useState([])
    const [showResults, setShowResults] = useState(false)
    const handleSearch = (e) => {
        if (e.target.value === "") {
            setShowResults(false)
        } else {
            setShowResults(true)
        }
        const results = recipes.filter(item => {
            if (item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item?.ingredients?.join("")?.toLowerCase()?.includes(e.target.value.toLowerCase())) return item
        })
        setTemp(results)
    }
    console.log("temp", temp)

    const flex = {
        display: "flex",
        alignItems: 'center'
    }

    const searchBar = {
        width: "80%",
        border: "none",
        boxShadow: "1px 2px 5px rgba(0,0,0,.5)",
        padding: "10px",
        borderRadius: "10px",
        margin: "10px"
    }
    return (
        <div>
            <div style={{...flex, justifyContent: "center"}}>
                <input style={searchBar} type='text' onChange={handleSearch} placeholder='&#x1F50E; Search by recipe name or Ingredients'/>
            </div>
            <div style={{...flex, flexDirection: "column", gap: "5px", alignItems: "flex-start", marginLeft: '15%'}}>
            {showResults && temp?.map(item => (
                <Link to={`/single/${item._id}`}>
                    <div style={{overflow: "hidden", height: "50px", background: "#eee", ...flex, width: '70vw', gap: "10px"}}>
                        <img src={item.img} style={{ width: "50px" }} />
                        <h3>{item.name}</h3>
                    </div>
                </Link>
            ))}
            </div>
        </div>
    )
}

export default Search