import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import userContext from '../context/userContext';
import { useContext } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import './Navbar.css';


function Navbar() {
    const {user, setUser} = useContext(userContext);
    const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();

    const logoutHandler = () => {
        Axios.post('http://localhost:3004/admin/logout')
        .then((response) => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("username");
            alert("You are successfully logged out");
            setUser(null)
            navigate('/login')
            console.log(localStorage.getItem("token"));
            return response.data;
        })
        .catch((err) => {
            console.log(err);
            return err;
        })
    }

    return (
        <nav>
        <div className='navbar'>
            <div className="logo"><Link to="/" className="nav-links">CourseStream</Link></div>
            {/* <div className="nav-items">      
              <ul>
                <li><Link to="/" className="nav-links">Home</Link></li>
                <li><Link to="/new" className="nav-links">New</Link></li>
                <li><Link to="/popular" className="nav-links">Trending</Link></li>
                <li><Link to="/watchlisted" className="nav-links">Watchlist</Link></li>
              </ul> 
            </div> */}
            
              <ul className="right-nav">
                {
                    !user ? <li><Link to="/login" className="nav-links">Login/Sign up</Link></li>
                    : <li className="nav-links" onClick={logoutHandler}>Logout</li>
                }               
              </ul>

        </div> 
        </nav>
    )
}
export default Navbar;