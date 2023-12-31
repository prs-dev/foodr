import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
const Navbar = () => {
    const {user, setUser} = useContext(UserContext)
    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }
    const linkStyle = {
        textDecoration: "none",
        color: '#34343'
    }
    return (
        <>
            <div style={{zIndex: "999", display: "flex", width: "100%", top: "0", position: "fixed", gap: "10px", justifyContent: 'space-between',padding: "10px", alignItems: "center", height: "50px", background: "#ddd"}}>
                <div>
                    <Link style={linkStyle} to='/'> <h1>Foodr.</h1></Link>
                </div>
                <div style={{display: 'flex', gap: "10px"}}>
                    {!user && <Link style={linkStyle} to='/register'>Register</Link>}
                    {!user && <Link style={linkStyle} to='/login'>Login</Link>}
                    {user && <Link style={linkStyle} to='/add'>Add Recipe</Link>}
                    {user && <Link style={linkStyle} to='/search'>Search Recipes</Link>}
                    {user && <a href="#" style={linkStyle} onClick={logout}>Logout</a>}
                </div>
            </div>
        </>
    )
}

export default Navbar