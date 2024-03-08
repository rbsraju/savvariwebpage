import React from 'react';
import Home from './pages/HomePage';
import Login from './pages/Login';
import  Navbar  from './pages/Navbar'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import SignUp from './pages/SignUp';
import BookingForm from './RideSchedule/BookingForm';
import RideList from './RideSchedule/RideList';
import 'bootstrap/dist/css/bootstrap.min.css';
import AvailableRides from './pages/AvailableRides';



const account = {
  id: '',
  name: '',
  email: '',
};

function App() {
  return (
    <div className="App">
       <Navbar />
       
   <Router>
    <Routes>
      <Route path="/signIn" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<Home />} />
     <Route path="/BookRide" element ={<BookingForm id={''} destination={''} current={''} date={''} time={''} status={0} account={account}  />}/>
      <Route path="/RideStatus" element={<RideList/>}/>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/availableRides" element={<AvailableRides/>}/>
       
       
    </Routes>
   </Router>
   
    </div>
  );
}

export default App;
