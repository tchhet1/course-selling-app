import './Modal.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Axios from 'axios';
import courseContext from '../context/courseContext';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';


function EditModal({showModal, setShowModal, course, setCourse}) {
    
    const {courses, setCourses} = useContext(courseContext);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    
    const submitUpdate = async () => {
        
        try{
            const response = await Axios.put(`http://localhost:3004/admin/courses/${course.id}`,      
        {
            id: course.id,
            title: course.title,
            description: course.description
        }, 
        {
            headers: { 'Authorization': token },
        });

            //alert("You have updated the course")
            console.log('inside axios then');
            setCourse({...response.data.foundCourse});
            console.log(course);
            const newCourses = courses.map(item => {
                if(course.id == item._id){
                    console.log("course found");
                    return {...item, ...course};
                }
                return item;
            });
            // console.log(newCourses);
            setCourses([...newCourses]);
            setShowModal(false);
            return response.data;
       
        } catch(err){
            //if(err.response.status == 403) alert ("You have been logged out. Please login!");
            console.log(err);
            return err;
        }
        
    }

    
    return (
        <div className="modal-container">
            <div className='modal-content'>
                <button id="close" onClick={() => setShowModal(false)}>close</button>
                <div className='modal-body'>
                    <TextField id="outlined-basic" label="Title" value={course.title} variant="outlined" 
                    onChange={(e)=> setCourse({...course, title: e.target.value})} required/>
                    <TextField id="outlined-basic" label="Description" value={course.description} variant="outlined" 
                    onChange={(e)=> setCourse({...course, description: e.target.value})} required/>
                    <TextField id="outlined-basic" label="Price" value={course.price} variant="outlined" 
                    onChange={(e)=> setCourse({...course, price: e.target.value})} required/>
                    <Button variant="contained" onClick={submitUpdate}>Submit update</Button>
                </div>
            </div>                      
        </div>
    )
}

export default EditModal;