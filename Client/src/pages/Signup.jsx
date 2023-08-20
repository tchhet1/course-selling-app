import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import './Signup.css';
import Axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userContext from '../context/userContext';

function Signup(){

    const {user, setUser} = useContext(userContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const signupHandler = () => {
        if(username === "" || password === ""){
             alert("please fill out the required fields");
             return;
        }

        Axios.post('http://localhost:3004/admin/signup', {
            username: username,
            password: password,
        })
        .then(response => {
            localStorage.setItem("token", response.data.token);
            alert("You are successfully signed up")
            console.log(response.data)
            setUser(true)
            navigate("/"); 
            return response.data;
        })
        .catch(err => {
            console.log(err.message);
            return err;
        })
    }

    return <div className="signup">
        <Card variant={"outlined" } style={{padding: 20, width: 400, height: 300, display: 'flex', flexDirection: 'column'}}>
            <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e)=> setUsername(e.target.value)} required/>
            <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e)=> setPassword(e.target.value)} required/>
            <Button variant="contained" onClick={signupHandler}>Sign up</Button>
        </Card>
    </div>
}

export default Signup;