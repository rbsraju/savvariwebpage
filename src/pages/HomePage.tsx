import React, { Fragment, useEffect, useState } from 'react';
import '../css/Home.css';

import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const HomePage = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [role, setRole]=useState<string>('');
  
    // Retrieve values from cookies on component mount
    useEffect(() => {
      const idCookieValue = Cookies.get('idCookie');
      const tokenCookieValue = Cookies.get('tokenCookie');
      const roleCookieValue=Cookies.get('roleCookie');
      if (idCookieValue) {
        setId(idCookieValue);
      }
  
      if (tokenCookieValue) {
        setToken(tokenCookieValue);
      }
      if(roleCookieValue){
        setRole(roleCookieValue);
      }
     
    });
    
    
    const handleRideNavigation = () => {
        navigate('/BookRide')
      };
      const handleRideStatusNavigation = () => {
        if(id!=''){
            
        navigate('/RideStatus')
        }else{
            alert("LoginFirst");
            navigate('/')
        }
      };
      const availableRidesNavigation=()=>{
        navigate('/availableRides');
      }
  return (
    <div className="home-container">
      
      {role=="Customer"?<Fragment>
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
      </Fragment>:<Fragment></Fragment>}
      
     
     
      {role=="Driver"?<section className="AvailableRides">
        <h2>AvailableRides</h2>
        <p>Track your ride in real-time with our status checker.</p>
        <button onClick={availableRidesNavigation}>AvailableRides</button>
      </section>:<div></div>}
      
    </div>
  );
};

export default HomePage;
