import Axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Card } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import userContext from '../context/userContext';
import courseContext from '../context/courseContext';
import EditModal from '../components/Modal';

function Home(){
    
    const [editCourse, setEditCourse] = useState({});
    const [showModal, setShowModal] = useState(false);

    const {user, setUser} = useContext(userContext);
    const {courses, setCourses} = useContext(courseContext);



    const editCourseHandler = (id, title, description) => {
        setShowModal(true);
        setEditCourse({
            id: id,
            title: title,
            description: description
        })
    }
    

    return <div className="home-page">
        
        <Grid container spacing={3} style={{padding: 30}} >
        {
            courses.map((el, index) => {
                return (
                    <Grid item xs={3} key={index}>                   
                        <Card  style={{marginBottom: 10}} >
                            <CardHeader title={ el.title } />
                            <CardMedia
                                component="img"
                                height="194"
                                image="https://st2.depositphotos.com/1350793/8441/i/600/depositphotos_84415820-stock-photo-hand-drawing-online-courses-concept.jpg"
                                alt="online course"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                {el.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                Price: ${el.price}
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

        {showModal && <EditModal 
        showModal={showModal}
        setShowModal={setShowModal}
        courses={courses}
        setCourses={setCourses}
        course={editCourse}
        setCourse={setEditCourse}
        />}
        
    </div>
}
export default Home;

