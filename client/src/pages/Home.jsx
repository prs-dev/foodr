import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import { RecipeContext } from '../context/RecipeContext'
import { Link } from "react-router-dom"
import axios from "axios"
import {toast} from 'react-hot-toast'
const Home = () => {
  const { user } = useContext(UserContext)
  const { recipes, setRefetch } = useContext(RecipeContext)
  const [userId, setUserId] = useState('')
  useEffect(() => {
    const temp = async() => {
      try {
          const res = await axios.get('/users/profile', {
            headers: {
              Authorization: "Bearer " + user
            }
          })
          console.log("profile", res)
          setUserId(res?.data?.details?._id)
      } catch (error) {
        console.log(error)
      }
    }
    temp()
  }, [])

  const editStyle = {
    background: "#fff",
    color: "blue",
    padding: "10px",
    borderRadius: "10px",
    position: "absolute",
    right: "-5px",
    top: "-5px"
  }

  const deleteRecipe = async(id) => {
    try {
      const res = await axios.delete(`/recipes/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + user
        }
      })
      setRefetch(prev => !prev)
      toast.success(res?.data?.msg)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data)
    }
  }

  console.log(user, recipes)
  console.log(userId)
  // console.log(localStorage.getItem("token"))
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
      {recipes?.map(item => (
        <>
          <Link to={`/single/${item._id}`} style={{position:"relative",fontSize: '18px', textDecoration: "none", background: "#eee", boxShadow: "0px 2px 10px rgba(0,0,0,0.5)", overflow: "hidden", borderRadius: "10px", width: "15%", margin: "10px", display: "flex", alignItems: "center", flexDirection: "column", height: "20rem", gap: "10px" }} key={item._id}>
            <img src={item.img} style={{ width: "100%", height: "70%", objectFit: "cover", }} />
            <h4 style={{width: "12rem", textAlign: "center"}}>{item.name}</h4>
            {userId === item?.user && <Link style={editStyle} to={`/edit/${item._id}`}>&#9998;</Link>}
            {userId === item?.user && <Link style={{...editStyle, bottom: "-5px", top: "", color: "red", background: "#fff", zIndex: "90"}} onClick={() => deleteRecipe(item._id)}>&#10008;</Link>}
          </Link>
        </>
      ))}
    </div>
  )
}

export default Home