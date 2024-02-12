import React, { useEffect } from 'react';
import '../css/Home.css';

import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const navigate = useNavigate();
    var userRole=useSelector((state: RootState) => state.id.id);
   

    
    const handleRideNavigation = () => {
        navigate('/BookRide')
      };
      const handleRideStatusNavigation = () => {
        if(userRole!=null){
        navigate('/RideStatus')
        }else{
            alert("LoginFirst");
            navigate('/')
        }
      };
  return (
    <div className="home-container">
      

      <section className="hero">
        <h2>Book a Ride with Savvari</h2>
        <p>Enjoy a comfortable and reliable ride experience with Savvari.</p>
        <button onClick={handleRideNavigation}>Book a Ride</button>
      </section>

      <section className="status">
        <h2>Check Ride Status</h2>
        <p>Track your ride in real-time with our status checker.</p>
        <button onClick={handleRideStatusNavigation}>Check Ride Status</button>
      </section>
    </div>
  );
};

export default HomePage;
