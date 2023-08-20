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
import Courses from "./pages/Courses";


function App() {

const [user, setUser] = useState(false);
const [courses, setCourses] = useState([]);

const token = localStorage.getItem('token');

useEffect(()=> {
if(token) {
    setUser(true);
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
      </userContext.Provider>
    
    </div>
  )
}

export default App;