import './leftBar.css';
import {CgProfile} from 'react-icons/cg';
import {TfiWrite} from 'react-icons/tfi';
import {IoMdAdd, IoMdLogOut} from 'react-icons/io';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import userContext from '../context/userContext';
import { useContext } from 'react';

function LeftBar(){
    const {user, setUser} = useContext(userContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        Axios.post('http://localhost:3004/admin/logout')
        .then((response) => {
            localStorage.removeItem("token");
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
        <div className="left-bar">
            <div className="menu-items">
                <Link to="/">
                <div className="items">
                    <div className='items-icon'>
                        <CgProfile />
                    </div>
                     <div className='items-text'>
                        Profile
                     </div>  
                </div>
                </Link>
               { user && <Link to="/courses">
                <div className="items">
                    <div className='items-icon'>
                        <TfiWrite />
                    </div>
                    <div className='items-text'>
                        Courses
                    </div>
                </div>
                </Link>}
                {user && <Link to="/addcourse">
                <div className="items">
                    <div className='items-icon'>
                        <IoMdAdd />
                    </div>
                    
                    <div className='items-text'>
                        Add New Course
                    </div> 
                </div>
                </Link> }                  
                
                {user && <div className="items">
                    <div className='items-icon'>
                        <IoMdLogOut />
                    </div>
                    <div className='items-text' onClick={logoutHandler}>
                        Logout
                    </div>                   
                </div>}
            </div>
        </div>
    )
}

export default LeftBar;