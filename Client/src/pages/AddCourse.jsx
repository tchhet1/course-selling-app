import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import courseContext from '../context/courseContext';
import './Addcourse.css';
import Axios from 'axios';




function AddCourse(){

    const navigate = useNavigate();
    const [newCourse, setNewCourse] = useState({
            title: "",
            description: "",
            price: "",
    });
    const [published, setPublished] = useState(true);
    const {courses, setCourses} = useContext(courseContext);

    const onChangeHandler = (e) => {
        setNewCourse({...newCourse, [e.target.name]: e.target.value});
    }

    const switchHandler = (e) => {
        setPublished(e.target.checked);
    }


    const addCourse = () => {        
        Axios.post('http://localhost:3004/admin/addcourse', 
        {
            title: newCourse.title,
            description: newCourse.description,
            price: newCourse.price,
            published: published
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
            navigate('/');
            return response.data;
        })
        .catch(err => {
            alert("You must login first.")
            return err;
        })
    }

    console.log(courses);
    return <div className="addcourse-page">
        <div className="addcourse-form">
            <Stack>
                <TextField id="outlined-basic" name="title" value={newCourse.title} label="Course Title" variant="outlined" margin="normal"  onChange={onChangeHandler}/>
                <TextField id="outlined-basic" name="description" label="Course Description" variant="outlined" margin="normal" onChange={onChangeHandler}/>
                <TextField id="outlined-basic" name="price" label="Price" variant="outlined" margin="normal" onChange={onChangeHandler} />
                <FormControlLabel label="Published"  
                control={<Switch checked={published} onChange={switchHandler}/>} labelPlacement="start" margin="normal" />
                <Button variant="contained" onClick={addCourse} margin="normal" >Add Course</Button>
            </Stack>
        </div>
 
    </div>
}

export default AddCourse;