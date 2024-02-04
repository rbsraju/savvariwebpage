import React from 'react';
import '../css/Home.css';

import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/BookRide')
      };
  return (
    <div className="home-container">
      

      <section className="hero">
        <h2>Book a Ride with Savvari</h2>
        <p>Enjoy a comfortable and reliable ride experience with Savvari.</p>
        <button onClick={handleButtonClick}>Book a Ride</button>
      </section>

      <section className="status">
        <h2>Check Ride Status</h2>
        <p>Track your ride in real-time with our status checker.</p>
        <button>Check Ride Status</button>
      </section>
    </div>
  );
};

export default HomePage;
