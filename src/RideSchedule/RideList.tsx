import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { format } from "util";
import Cookies from "js-cookie";
import api from '../API/RidesInterceptor';
//import '../css/Login.css';

const RideList: React.FC = () => {
  const [rides, setRides] = useState([]);
  const [id, setid] = useState("");
  var userid = Cookies.get('idCookie');
  const yourData = useSelector((state: RootState) => state.user.userDetails);
  
  useEffect(() => {
    if(userid)
    {
      setid(userid);
    }
    alert(yourData);
    const fetchRides = async () => {
    
      try {
        
        const response = await api.get(
          "" + userid
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
              <th>Driver</th>
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
                <td>{ride.account.name}</td>
                <td>{ride.status==1?(<p style={{ color: 'red' }}>Pending</p>):(<p style={{ color: 'green' }}>Approved</p>)}
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
