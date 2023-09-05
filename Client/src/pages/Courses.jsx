import LeftBar from "../components/leftBar";
import EditModal from '../components/Modal';
import { Card } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import userContext from '../context/userContext';
import courseContext from '../context/courseContext';
import myCourseContext from '../context/myCourseContext'

function Courses(){
    const [editCourse, setEditCourse] = useState({});
    const [showModal, setShowModal] = useState(false);
    const {user, setUser} = useContext(userContext);
    const {courses, setCourses} = useContext(courseContext);
    const {myCourses, setMyCourses} = useContext(myCourseContext);
    const [filter, setFilter] = useState(false);

    const styles = {
        button:{
          backgroundColor: filter ? "#EFEFEF" : "#1665C0",
          color: filter ? '#1665C0' : '#ffffff'
        },
        button2:{
            backgroundColor: filter ? "#1665C0" : "#EFEFEF",
            color: filter ? '#ffffff' : '#1665C0'
          },

      };


    const editCourseHandler = (id, title, description, price) => {
        setShowModal(true);
        setEditCourse({
            id: id,
            title: title,
            description: description,
            price: price
        })
    }

    const getMyCourses = () => {
        
        Axios.get(`http://localhost:3004/admin/courses/${user.userId}`,
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                }
            })
            .then(response => {
                // console.log(response.data.courses);
                setMyCourses([...response.data.courses]);
                setFilter(true);
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }

    useEffect(() => {
        Axios.get("http://localhost:3004/admin/courses",
        {
        headers: {
            "Content-type": "application/json",
            "Authorization": localStorage.getItem("token"),
        }
        })
        .then(response => {
            
            setCourses([...response.data.courses]);
        })
        .catch(err => {
            console.log(err);
            return err;
        })
    }, [])

    
    return (
        <div className="courses-page two-column">
            <LeftBar />
            <div className='main'>
                <div className="filters">
                    <button onClick={() => setFilter(false)} style={styles.button}>All Courses</button>
                    <button onClick={getMyCourses} style={styles.button2}>My Courses</button>
                </div>
                
                { !filter ?
                    <Grid container spacing={3} style={{padding: 30}} >
                {
                    courses.map((el, index) => {
                        return (
                            
                            <Grid item xs={8} sm={4} key={index}>                   
                                <Card  style={{marginBottom: 10}} >
                                    <CardHeader title={ el.title } />
                                   {el.imageLink ? 
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={`data:image/jpeg;base64,${el.imageLink}`}
                                        alt="online course"
                                    />
                                    :
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image="https://st2.depositphotos.com/1350793/8441/i/600/depositphotos_84415820-stock-photo-hand-drawing-online-courses-concept.jpg"
                                        alt="online course"
                                    />
                                    }
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                        {el.description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                        <b>Price:</b> ${el.price}
                                        </Typography>
                                    </CardContent>
                                    {el.createdBy == user.userId &&
                                        <CardActions >
                                            <Button variant="contained" onClick={() => editCourseHandler(el._id, el.title, el.description, el.price)}>Edit Course</Button>
                                        </CardActions>
                                    }
                                </Card>                   
                            </Grid>
                            ) 
                        })

                        
                    }
                    </Grid>
                    : 
                    <Grid container spacing={3} style={{padding: 30}} >
                    {
                        myCourses.map((el, index) => {
                            return (
                                
                                <Grid item xs={8} sm={4} key={index}>                   
                                    <Card  style={{marginBottom: 10}} >
                                        <CardHeader title={ el.title } />
                                    {el.imageLink ? 
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image={`data:image/jpeg;base64,${el.imageLink}`}
                                            alt="online course"
                                        />
                                        :
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image="https://st2.depositphotos.com/1350793/8441/i/600/depositphotos_84415820-stock-photo-hand-drawing-online-courses-concept.jpg"
                                            alt="online course"
                                        />
                                        }
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                            {el.description}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                            <b>Price:</b> ${el.price}
                                            </Typography>
                                        </CardContent>
                                        <CardActions >
                                            <Button variant="contained" onClick={() => editCourseHandler(el._id, el.title, el.description)}>Edit Course</Button>
                                        </CardActions>
                                    </Card>                   
                                </Grid>
                                ) 
                            })    
                    }
                    </Grid>
                    }
                    {
                        showModal && 
                            <EditModal showModal = {showModal} 
                                        setShowModal = {setShowModal}
                                        course = {editCourse}
                                        setCourse = {setEditCourse}
                            />
                    }
                    
            </div>

        </div>
    )
}

export default Courses;