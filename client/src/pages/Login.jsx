import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const Login = () => {
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const loginUser = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/users/login', data)
      toast.success(res?.data?.msg)
      const token = res?.data?.token
      localStorage.setItem("token", token)
      setUser(token)
      setData()
      navigate("/")
    } catch ({response: {data}}) {
      toast.error(data.err)
    }
  }

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
    <>
    <div style={{ ...styles }}>
      <form onSubmit={loginUser} style={{background: "#eee", display: "flex", flexDirection: "column", padding: "30px", gap: "10px"}}>
        <label>Email</label>
        <input style={inputStyles} type="email" value={data.email} onChange={e => setData({...data, email: e.target.value})}/>
        <label>Password</label>
        <input style={inputStyles} type="password" value={data.password} onChange={e => setData({...data, password: e.target.value})}/>
        <input style={{...inputStyles, fontSize: "16px"}} type="submit" value="Login" />
      </form>
      </div>
    </>
  )
}

export default Login