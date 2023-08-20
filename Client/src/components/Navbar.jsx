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
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
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
            alert("You are successfully logged out");
            setUser(false)
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

    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar>
            <Link to="/">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Course Selling App
                </Typography>
            </Link>
            {user ?
                <> 
                 
                        <MenuItem>
                            <Link to="/addcourse">
                                <Typography textAlign="center">Add Course</Typography>
                            </Link>
                        </MenuItem>     
                        <MenuItem>                           
                            <AccountCircle onClick={() => setDropdown(true)}/>
                            {
                            dropdown &&
                            <div className='dropddown-item'>
                                <Link to="/addcourse">
                                    <Typography textAlign="center">My Account</Typography>
                                </Link>
                                
                                    <Typography textAlign="center" onClick={logoutHandler}>Log out</Typography>
                                
                            </div>
                            }

                        </MenuItem>
                                                       
                </>
                
                : 
                <>
                    <Link to="/login">
                        <Button color="inherit">Login</Button>
                    </Link>
                    <Link to="/signup">
                        <Button color="inherit">Signup</Button>
                    </Link>
                </>
                
            }
            
            
        </Toolbar>
        </AppBar>
    </Box>
    )
}
export default Navbar;