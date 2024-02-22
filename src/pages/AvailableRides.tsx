import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Record {
  id: string;
  rideId: string;
  destination: string;
  current: string;
  date: string;
  time: string;
  status: number;
}

const AvailableRides: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [postRecord, setPostResord]=useState<Record>();

  useEffect(() => {
    // Fetch records from your GET API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7000/api/Ride/availableRides');
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleApprove = async (record: Record) => {
    try {
        setPostResord(record);
      // Perform the POST API call to approve the record
      const response = await axios.post('https://localhost:7000/api/Ride/updateRide',  postRecord );
      console.log('Record Approved:', response.data);

      // Remove the approved record from the list
      setRecords((prevRecords) => prevRecords.filter((record) => record.rideId !== record.rideId));
    } catch (error) {
      console.error('Error approving record:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Record List</h2>

      <div className="row">
        {records.map((record) => (
            
          <div key={record.rideId} className="col-md-4">
            <div className="record-card">
              <h4>{record.destination}</h4>
              <p>{record.current}</p>
              <p>{record.date} - {record.time}</p>

              {record.status === 1 && (
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
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableRides;
