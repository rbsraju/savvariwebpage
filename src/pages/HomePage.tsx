import React from 'react';
import '../css/Home.css';

const HomePage = () => {
  return (
    <div className="home-container">
      

      <section className="hero">
        <h2>Book a Ride with Savvari</h2>
        <p>Enjoy a comfortable and reliable ride experience with Savvari.</p>
        <button>Book a Ride</button>
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
