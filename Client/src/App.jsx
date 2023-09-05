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
import myCourseContext from "./context/myCourseContext";
import Courses from "./pages/Courses";


function App() {

const [user, setUser] = useState(null);
const [courses, setCourses] = useState([]);
const [myCourses, setMyCourses] = useState([]); 

const token = localStorage.getItem('token');

useEffect(()=> {
  async function getUser(){
    try{
      const response = await Axios.get('http://localhost:3004/', 
      {
          headers: {
              "Content-type": "application/json",
              "Authorization": token,
          }
      });

      setUser(response.data.user);
    } catch(err){
      console.log(err);
      return err;
    } 
     
  }

  if(token) {
    getUser();
  } 

}, [token])
 
  return (
    <div>
      <userContext.Provider  value={{
        user: user, 
        setUser: setUser
        }}>
          <myCourseContext.Provider value={{
            myCourses: myCourses,
            setMyCourses: setMyCourses
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
            <Route exact path="/addcourse" element={user ? <AddCourse /> : <Login />} />
            <Route exact path="/courses" element={user ? <Courses /> : <Login />} />
          </Routes>
        </courseContext.Provider>
        </myCourseContext.Provider>
      </userContext.Provider>
    
    </div>
  )
}

export default App;