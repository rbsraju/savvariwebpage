import React from 'react';
import Home from './pages/HomePage';
import Login from './pages/Login';
import  Navbar  from './pages/Navbar'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import SignUp from './pages/SignUp';
import BookingForm from './BookingSite/BookingForm';
import RideList from './BookingSite/RideList';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  return (
    <div className="App">
       <Navbar />
       
   <Router>
    <Routes>
      <Route path="/signIn" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<Home />} />
     <Route path="/BookRide" element ={<BookingForm destination={''} current={''} date={''} time={''} status={1} id={''} />}/>
      <Route path="/RideStatus" element={<RideList/>}/>
      <Route path="*" element={<Navigate to="/" />} />
       
       
    </Routes>
   </Router>
   
    </div>
  );
}

export default App;
