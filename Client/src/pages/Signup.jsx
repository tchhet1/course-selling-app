import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import './Signup.css';
import Axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import userContext from '../context/userContext';

function Signup(){

    const {user, setUser} = useContext(userContext);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const signupHandler = () => {
        if(username === "" || password === ""){
             alert("please fill out the required fields");
             return;
        }

        Axios.post('http://localhost:3004/admin/signup', {
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: password,
        })
        .then(response => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("token", response.data.newAdmin.username);
            localStorage.setItem("userId", response.data.newAdmin._id);
            alert("You are successfully signed up")
            console.log(response.data)
            setUser(response.data.newAdmin)
            navigate("/"); 
            return response.data;
        })
        .catch(err => {
            console.log(err.message);
            return err;
        })
    }

    return <div className="signup-page">
        <Card variant={"outlined" } style={{padding: 20, width: 400, height: "auto", display: 'flex', flexDirection: 'column', gap: 15}}>
            <h3 style={{textAlign: "center"}}>Sign up</h3>
            <TextField id="outlined-basic" label="Firstname" variant="outlined" onChange={(e)=> setFirstname(e.target.value)} required/>
            <TextField id="outlined-basic" label="Lastname" variant="outlined" onChange={(e)=> setLastname(e.target.value)} required/>
            <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e)=> setUsername(e.target.value)} required/>
            <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e)=> setPassword(e.target.value)} required/>
            <Button variant="contained" onClick={signupHandler}>Sign up</Button>
            <p style={{textAlign: "center"}}>Already have an account? <Link to="/login">Login</Link></p>
        </Card>
    </div>
}

export default Signup;