import Axios from "axios";
import { useEffect, useState, useContext } from "react";
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import userContext from '../context/userContext';
import "./Login.css";

function Login() {
    //const [user, setUser] = useContext(userContext);

    const {user, setUser} = useContext(userContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    

    const loginHandler = () => {
        if(username === "" || password === ""){
             alert("please fill out the required fields");
             return;
        }

        Axios.post('http://localhost:3004/admin/login', {
            username: username,
            password: password,
        })
        .then(response => {
            localStorage.setItem("token", "Bearer " + response.data.token);
            localStorage.setItem("username", response.data.foundAdmin.username);
            localStorage.setItem("userId", response.data.foundAdmin._id);
            alert("You are successfully logged in");
            setUser(response.data.foundAdmin);
            console.log(response)
            navigate('/');
            return response.data;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
    }

    return <div className="login-page">
        
        <Card variant={"outlined" } style={{padding: 20, width: 400, height: 300, display: 'flex', flexDirection: 'column', gap: 15}}>
            <h3 style={{textAlign: "center"}}>Login</h3>
            <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e)=> setUsername(e.target.value)} required/>
            <TextField id="outlined-basic" type="password" label="Password" variant="outlined" onChange={(e)=> setPassword(e.target.value)} required/>
            <Button variant="contained" onClick={loginHandler}>Login</Button>
            <p style={{textAlign: "center"}}>Not registered yet? <Link to="/signup">Sign up</Link></p>
        </Card>
    </div>
}

export default Login;