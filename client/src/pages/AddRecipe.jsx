import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import { RecipeContext } from '../context/RecipeContext'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-hot-toast"

const AddRecipe = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    img: '',
    prep: 0,
    cook: 0,
    ingredients: [],
    method: []
  })

  const { user } = useContext(UserContext)
  const { setRefetch } = useContext(RecipeContext)

  const [temp, setTemp] = useState("")
  const [temp2, setTemp2] = useState("")

  const add = async () => {
    try {
      const res = await axios.post('/recipes/add', data, {
        headers: {
          Authorization: "Bearer " + user
        }
      })
      setData({
        name: '',
        img: '',
        prep: 0,
        cook: 0,
        ingredients: [],
        method: []
      })
      setRefetch(prev => !prev)
      navigate("/")
      console.log(res)
      toast.success("Recipe Added!")
    } catch (error) {
      console.log(error)
    }
  }

  console.log(data)

  const styles = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
    height: "90vh",
    justifyContent: "center",
  }

  const inputStyles = {
    width: "20rem",
    height: "30px",
  }

  return (
    <div style={styles}>
      <div style={{background: "#eee", display: "flex", flexDirection: "column", padding: "30px", gap: "10px"}}>
      <label>Name</label>
      <input style={inputStyles} type="text" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
      <label>Image URL</label>
      <input style={inputStyles} type="text" value={data.img} onChange={e => setData({ ...data, img: e.target.value })} />
      <label>Prep Time(in mins)</label>
      <input style={inputStyles} type="number" value={data.prep} onChange={e => setData({ ...data, prep: Number(e.target.value) })} />
      <label>Cook Time(in mins)</label>
      <input style={inputStyles} type="number" value={data.cook} onChange={e => setData({ ...data, cook: Number(e.target.value) })} />
      <label>Ingredients</label>
      {data?.ingredients?.map(item => (
        <li>{item}</li>
      ))}
      <div style={{display: "flex", alignItems: "center"}}>
        <input style={inputStyles} type="text" value={temp} onChange={e => setTemp(e.target.value)} />
        <button style={{...inputStyles, fontSize: "16px", width: "2rem", marginLeft: "2px"}} onClick={() => {
          setData(prev => ({ ...prev, ingredients: prev.ingredients.concat(temp) }))
          setTemp('')
        }}>+</button>
      </div>
      <label>Method</label>
      {data?.method?.map(item => (
        <li>{item}</li>
      ))}
      <div style={{display: "flex", alignItems: "center"}}>
      <input style={inputStyles} type="text" value={temp2} onChange={e => setTemp2(e.target.value)} />
      <button style={{...inputStyles, fontSize: "16px", width: "2rem", marginLeft: "2px"}} onClick={() => {
        setData(prev => ({ ...prev, method: prev.method.concat(temp2) }))
        setTemp2('')
      }}>+</button>
      </div>
      <button style={{...inputStyles, fontSize: "16px"}} onClick={add}>Add Recipe</button>
      </div>
    </div>
  )
}

export default AddRecipe