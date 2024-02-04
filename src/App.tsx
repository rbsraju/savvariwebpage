import React from 'react';
import Home from './pages/HomePage';
import Login from './pages/Login';
import  Navbar  from './pages/Navbar'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import SignUp from './pages/SignUp';
import BookingForm from './BookingSite/BookingForm';



function App() {
  return (
    <div className="App">
       <Navbar />
   <Router>
    <Routes>
      <Route path="/signIn" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<Home />} />
     <Route path="/BookRide" element ={<BookingForm destination={''} current={''} date={''} time={''} />}/>
      <Route path="*" element={<Navigate to="/" />} />
       
       
    </Routes>
   </Router>
   
    </div>
  );
}

export default App;
