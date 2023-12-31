import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Single from './pages/Single'
import AddRecipe from './pages/AddRecipe'
import {Toaster} from 'react-hot-toast'
import axios from 'axios'
import { useContext } from "react"
import { UserContext } from "./context/UserContext"
import EditRecipe from "./pages/EditRecipe"
import Search from "./pages/Search"


const App = () => {
  // axios.defaults.baseURL = "http://localhost:5000"
  const {user} = useContext(UserContext)
  console.log("app",user)
  return (
    <>
      <Toaster position="top-right"/>
      <div>
      <Navbar />
      </div>
      <div style={{marginTop: "50px"}}>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/register" element={!user ? <Register /> : <Home />} />
        <Route path="/login" element={!user ? <Login /> : <Home />} />
        <Route path="/single/:id" element={!user ? <Login /> : <Single />} />
        <Route path="/add" element={!user ? <Login /> : <AddRecipe />} />
        <Route path="/edit/:id" element={!user ? <Login /> : <EditRecipe />} />
        <Route path="/search" element={!user ? <Login /> : <Search />} />
      </Routes>
      </div>
    </>
  )
}

export default App