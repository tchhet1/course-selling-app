import LeftBar from '../components/leftBar';
import userContext from '../context/userContext';
import { useContext } from 'react';
import myCourseContext from '../context/myCourseContext'
import { Link } from 'react-router-dom';
import '../App.css';

function Home(){
    const {user, setUser} = useContext(userContext);
    const {myCourses, setMyCourses} = useContext(myCourseContext);

    console.log(myCourses);
    

    return <div className="home-page two-column">
        <LeftBar /> 
        <div className='main'>
            {
                user !== null
                ? <div className='profile-section'>
                    <div className='profile-about'>
                        <h4>About:</h4>
                        <div><b>First Name:</b> Tripti</div>
                        <div><b>Last Name:</b> Chhetri</div>
                        <div><b>Email:</b> {user.username}</div>
                        <div><b>Address:</b> 123 Main St<br />12345 San Diego, California</div>
                        
                    </div>
                    <div className='profile-courses'>
                        <h4>Courses:</h4>
                        <div><b>Number of Courses Added:</b> 4</div>
                    </div>
                    {/* <div className='profile-recent-activity'>
                        <h4>Recent Activity:</h4>

                    </div> */}
                </div>
                : <div>
                    <p>Please <Link to="/login">login/signup</Link> to access your account.</p>
                </div>
            }

        </div>

    </div>
}
export default Home;

