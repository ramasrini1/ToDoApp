import { NavLink } from 'react-router-dom'
import { useAuth } from '../Auth/auth';
import logo from '../assets/logo.png';
import "./Navbar.css";

export const Navbars = () => {
  const auth = useAuth()
  
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'underline'
    }
  }

return (
  <nav className="container mt-4">
      <NavLink to='/' style={navLinkStyles}>
        <b style={{ color: "red" }}><span className="logo"><img className="logo" 
        src={logo} alt=""></img>&nbsp;&nbsp;RMS</span></b>
      </NavLink>
      <NavLink to='/' style={navLinkStyles}>Home</NavLink>
      <NavLink to='/todo' style={navLinkStyles}>
        Todo
      </NavLink>
      <NavLink to='/about' style={navLinkStyles}>
        About
      </NavLink>
      

      { auth.user && (<NavLink to='/login' onClick={auth.logout} style={navLinkStyles}>
           Logout {auth.user}
      </NavLink>
      )}
     
      {!auth.user && (
        <NavLink to='/login' style={navLinkStyles}>
          Login
        </NavLink>
      )}
    </nav>
  )
}
