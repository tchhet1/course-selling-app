import Axios from "axios";
import { useEffect, useState, useContext } from "react";
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import userContext from '../context/userContext';


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
            alert("You are successfully logged in");
            setUser(true);
            console.log(response)
            navigate('/');
            return response.data;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
    }

    return <div className="signup">
        <Card variant={"outlined" } style={{padding: 20, width: 400, height: 300, display: 'flex', flexDirection: 'column'}}>
            <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e)=> setUsername(e.target.value)} required/>
            <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e)=> setPassword(e.target.value)} required/>
            <Button variant="contained" onClick={loginHandler}>Login</Button>
        </Card>
    </div>
}

export default Login;