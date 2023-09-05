import TextField from '@mui/material/TextField';
import { Button, Input, FormControl, InputLabel } from '@mui/material';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import courseContext from '../context/courseContext';
import userContext from '../context/userContext';
import './Addcourse.css';
import Axios from 'axios';
import LeftBar from '../components/leftBar';

function AddCourse(){

    const navigate = useNavigate();
    const [newCourse, setNewCourse] = useState({
            title: "",
            description: "",
            price: "",
            image: ""
    });
    const [published, setPublished] = useState(true);
    const [imageFile, setImageFile] = useState();
    const {courses, setCourses} = useContext(courseContext);
    const {user, setUser} = useContext(userContext);

    const onChangeHandler = (e) => {
        setNewCourse({...newCourse, [e.target.name]: e.target.value});
    }

    const [base64Image, setBase64Image] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            setBase64Image(base64String);
        };
        reader.readAsDataURL(file);
        }
    };
   
    

    const switchHandler = (e) => {
        setPublished(e.target.checked);
    }

    const addCourse = () => {        
        Axios.post('http://localhost:3004/admin/addcourse', 
        {
            title: newCourse.title,
            description: newCourse.description,
            price: newCourse.price,
            published: published,
            image: base64Image, 
            createdBy: user.userId
        },
        {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem("token"),
            }
        })
        .then(response => {
            alert("Course was successfully created");
            const course = response.data.newCourse;
            setCourses([...courses, course])
            console.log(response.data)
            navigate('/courses');
            return response.data;
        })
        .catch(err => {
            alert("You must login first.")
            return err;
        })
    }

   

   
    return <div className="addcourse-page two-column">
        <LeftBar />
        <div className='main'>
            <div className="addcourse-form">
                <Stack>
                    <TextField id="outlined-basic" name="title" value={newCourse.title} label="Course Title" variant="outlined" margin="normal"  onChange={onChangeHandler}/>
                    <TextField id="outlined-basic" name="description" label="Course Description" variant="outlined" margin="normal" onChange={onChangeHandler}/>
                    <TextField id="outlined-basic" name="price" label="Price" variant="outlined" margin="normal" onChange={onChangeHandler} />
                    <Input
                        id="file-upload"
                        name="image"
                        type="file"
                        accept=".jpg, .jpeg, .png, .gif"
                        onChange={handleImageUpload}
                        style={{display: "none"}}
                    />
                    <Button variant="outlined" component="label" htmlFor="file-upload" color="success">
                        Upload thumbnail
                    </Button>
            
                    
                    {base64Image && <img src={`data:image/jpeg;base64,${base64Image}`} width="200px" height="auto"/>}
                    <FormControlLabel label="Published"  
                    control={<Switch checked={published} onChange={switchHandler}/>} labelPlacement="start" margin="normal" />
                    <Button variant="contained" onClick={addCourse} margin="normal" >Add Course</Button>
                </Stack>
            </div>
        </div>
    </div>
}

export default AddCourse;