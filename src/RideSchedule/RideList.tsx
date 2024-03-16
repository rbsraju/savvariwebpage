import React, { useEffect, useState } from "react";
import { RideDetails, UserAccount } from "../Types";  
import { useSelector } from "react-redux";
import { RootState } from "../store";

import Cookies from "js-cookie";
import api from "../API/axiosL&A"
//import '../css/Login.css';

const RideList: React.FC = () => {
  const [rides, setRides] = useState<RideDetails[]>([]);
  const [id, setid] = useState<string>("");
  var userid = Cookies.get('idCookie');
  const yourData = useSelector((state: RootState) => state.user.userDetails);
  
  useEffect(() => {
    if(userid)
    {
      setid(userid);
    }
  
    const fetchRides = async () => {
    
      try {
        
        const response = await api.get<RideDetails[]>(
          "Ride?id=" + userid
        );
        setRides(response.data);
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
    };
    fetchRides();
  }, []);

  return (
    <div className="container-fluid">
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
