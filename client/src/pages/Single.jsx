import { useContext, useEffect, useState } from "react"
import { RecipeContext } from '../context/RecipeContext'
import { useParams } from 'react-router-dom'
import axios from "axios"

const Single = () => {
  const [recipe, setRecipe] = useState({})
  const { id } = useParams()
  console.log(id)
  useEffect(() => {
    const temp = async () => {
      try {
        const res = await axios.get(`/recipes/${id}`)
        setRecipe(res?.data?.recipe)
        console.log(res?.data?.recipe)
      } catch (error) {
        console.log(error)
      }

    }
    temp()
  }, [])
  const bigCard = {
    width: "80%",
    height: "80vh",
    display: "flex",
    background: "#eee",
    gap: "20px",
    borderRadius: "10px",
    overflow: "hidden",
  }

  const flex = {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    margin: "10px"
  }
  return (
    <div style={{padding: "10px", display: "flex", alignItems: 'center', justifyContent: "center", height: "90vh" }}>
      <div style={bigCard}>
        <div className="left" style={{ width: "50%" }}>
          <img style={{ height: "100%", width: "100%" }} src={recipe?.img} alt="" />
        </div>
        <div className="right" style={{ width: "50%" }}>
          <h2 style={{margin: "10px"}}>{recipe.name}</h2>
          <div style={flex}>
            <strong>Prep time:</strong>
            <span>{recipe.prep} minutes</span>
          </div>
          <div style={flex}>
            <strong>Cook time:</strong>
            <span>{recipe.cook} minutes</span>
          </div>
          <div style={flex}>
            <strong>Total time:</strong>
            <span>{recipe.prep + recipe.cook} minutes</span>
          </div>
          <div style={{margin: "10px"}}>
            <h3 style={{margin: "10px"}}>Ingredients</h3>
            <ul style={{margin: "10px"}}>
              {recipe?.ingredients?.map(item => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
          <div style={{margin: "10px"}}>
            <h3 style={{margin: "10px"}}>Method:</h3>
            <div style={{margin: "10px"}}>
              {recipe?.method?.map((item, index) => (
                <>
                  <h4 style={{margin: "5px"}}>Step {index + 1}</h4>
                  <p>{item}</p>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Single