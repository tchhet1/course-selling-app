import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Axios from 'axios';
import Navbar from "./components/Navbar";
import AddCourse from "./pages/AddCourse";
import Signup from './pages/Signup';
import Home from './pages/Home';
import Login from './pages/Login'
import userContext from "./context/userContext";
import courseContext from "./context/courseContext";
import loggedContext from "./context/loggedContext";
import Courses from "./pages/Courses";


function App() {

const [user, setUser] = useState(null);
const [courses, setCourses] = useState([]);
const [isLoggedin, setIsLoggedin] = useState(false); //currently not using this 

const token = localStorage.getItem('token');
console.log(user);
useEffect(()=> {
if(token) {
  Axios.get('http://localhost:3004/', 
        {
            headers: {
                "Content-type": "application/json",
                "Authorization": token,
            }
        })
        .then(response => {
            setUser(response.data.user);
            return response;
        })
        .catch(err => {
            return err;
        })
  
}

Axios.get("http://localhost:3004/admin/courses")
.then(response => {
    console.log(courses);
    setCourses([...response.data.courses]);
})
.catch(err => {
    console.log(err);
    return err;
})

}, [])
 
  return (
    <div>
      <userContext.Provider  value={{
        user: user, 
        setUser: setUser
        }}>
          <loggedContext.Provider value={{
            isLoggedin: isLoggedin,
            setIsLoggedin: setIsLoggedin
          }}>
          <courseContext.Provider value={{
            courses: courses,
            setCourses: setCourses
        }}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/addcourse" element={<AddCourse />} />
            <Route exact path="/courses" element={<Courses />} />
          </Routes>
        </courseContext.Provider>
        </loggedContext.Provider>
      </userContext.Provider>
    
    </div>
  )
}

export default App;