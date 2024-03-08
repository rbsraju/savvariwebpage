import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../API/RidesInterceptor'
import Cookies from 'js-cookie';
import {RideDetails} from '../Types';

const AvailableRides: React.FC = () => {
  const [records, setRecords] = useState<RideDetails[]>([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [id, setId]=useState<string>('');
  const fetchData = async () => {
    try {
      const response = await api.get('availableRides');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };
  useEffect(() => {
    // Fetch records from your GET API
    const Id= Cookies.get('idCookie');
     if(Id)
     {
        
        setId(Id);
     }
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleApprove = async (record: RideDetails) => {
    try {
        const data = {
            Record : record,
            string: id,
          };
      //  POST API call to approve the record
      const response = await api.post('updateRide',  data );
      console.log('Record Approved:', response.data);
      fetchData();
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
      // Remove the approved record from the list
      
    
    } catch (error) {
      console.error('Error approving record:', error);
    }
  };

  return (
    <div className="container">
          {showSuccessAlert && (
        <div className="alert alert-success mt-3" role="alert">
          Ride Approved 
        </div>
      )}
      <h2 className="mt-4 mb-4">Available Rides</h2>

      <div className="row">
        {records.map((record) => (
         
         record.status === 1 && (
            <div key={record.rideId} className="col-md-5">
              <div className="record-card">
                <h4>{record.destination}</h4>
                <p>{record.current}</p>
                <p>{record.date} - {record.time}</p>
          
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => handleApprove(record)}
                  >
                    Approve
                  </button>
                  <button type="button" className="btn btn-danger">
                    Reject
                  </button>
                </div>
              </div>
            </div>
         )
          
        ))}
      </div>
      
    </div>
  );
};

export default AvailableRides;
