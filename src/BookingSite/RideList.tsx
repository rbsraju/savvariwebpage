import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { format } from "util";
import Cookies from "js-cookie";
import api from '../pages/axiosL&A'

const RideList: React.FC = () => {
  const [rides, setRides] = useState([]);
  const [id, setid] = useState("");
  var userRole = Cookies.get('idCookie');
  
  useEffect(() => {
    const fetchRides = async () => {
    
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
        const response = await api.get(
          "/api/Ride/" + userRole
        );
        setRides(response.data);
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
    };
    fetchRides();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Ride List</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Time</th>
              <th>Date</th>
              <th>Destination</th>
              <th>Current</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride: any) => (
              <tr key={ride.rideId}>
                <td>{ride.time }</td>
                <td>{ride.date}</td>
                <td>{ride.destination}</td>
                <td>{ride.current}</td>
                <td>{ride.status==1?(<p>Pending</p>):(<p>Approved</p>)}
                </td>
                <td style={{ display: "none" }}>{ride.rideId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RideList;
