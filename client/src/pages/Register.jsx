import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const registerUser = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/users/register', data)
      toast.success(res.data.msg)
      setData()
      navigate("/login")
    } catch ({ response: { data } }) {
      toast.error(data.err)
    }
    // console.log(data)
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
      <form onSubmit={registerUser} style={{background: "#eee", display: "flex", flexDirection: "column", padding: "30px", gap: "10px"}}>
        <label>Name</label>
        <input style={inputStyles} type="text" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
        <label>Email</label>
        <input style={inputStyles} type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
        <label>Password</label>
        <input style={inputStyles} type="password" value={data.password} onChange={e => setData({ ...data, password: e.target.value })} />
        <input style={{...inputStyles, fontSize: "16px"}} type="submit" value="Register" />
      </form>
      </div>
    </>
  )
}

export default Register