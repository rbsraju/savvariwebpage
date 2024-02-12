// src/components/BookingForm.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LocationSearch from './LocationSearch';
import { Form, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TimePicker from 'react-time-picker';

import { Form as bForm, Button, Col } from 'react-bootstrap';
import { format } from 'util';


interface BookingFormData {
    id:string;
  destination: string;
  current:string;
  date: string;
  time: string;
  status:number
}

const BookingFormSchema = yup.object().shape({
  destination: yup.string().required('Destination is required'),
  current: yup.string().required('Current is required').notOneOf([yup.ref('destination')], 'Destination and current address should be different'),
  date: yup.string().required('Date is required'),
  time: yup.string().required('Time is required'),
});

const BookingForm: React.FC<BookingFormData> = (BookingFormData) => {
    const navigate = useNavigate();
    const jwt = useSelector((state: RootState) => state.auth.token);
    const cid = useSelector((state: RootState) => state.id.id);

    const sendRideDetails=(rideData:BookingFormData)=>{
        alert(jwt);
        try {
            if(cid!=null){
                rideData.id=cid;
                alert(cid);
            }
           
            // Make a POST request using Axios
            const response =  axios.post('https://localhost:7000/api/Ride', rideData);
           
           
            // Handle the response if needed
            navigate('/')
          } catch (error) {
            // Handle errors
            console.error('Error:', error);
          }
    }
  const formik = useFormik({
    initialValues: {
        id:'',
      destination: '',
      current:'',
      date: '',
      time: '',
      status: 1
    },
    validationSchema: BookingFormSchema,
    onSubmit: (values) => {
        if (jwt==null){
            alert("Login First");
            navigate("/signIn");
        }
       values.time=new Date(`2000-01-01T${values.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, });
     
       sendRideDetails(values)
    },
  });
  

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Destination:</label>
        <LocationSearch address={formik.values.destination} setAddress={formik.setFieldValue.bind(null, 'destination')} />
        {formik.touched.destination && formik.errors.destination && <div>{formik.errors.destination}</div>}
      </div>
      <div>
        <label>Current:</label>
        <LocationSearch address={formik.values.current} setAddress={formik.setFieldValue.bind(null, 'current')} />
        {formik.touched.destination && formik.errors.current && <div>{formik.errors.current}</div>}
      </div>

      <div>
        <label>Date:</label>
        <input type="date" name="date" value={formik.values.date} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.touched.date && formik.errors.date && <div>{formik.errors.date}</div>}
      </div>

      <div>
        <label>Time:</label>
        <input type="time"  name="time" value={formik.values.time}  onChange={formik.handleChange} className="form-control" onBlur={formik.handleBlur} />
        {formik.touched.time && formik.errors.time && <div>{formik.errors.time}</div>}
      </div>
      
       
     
      <button type="submit">Book Ride</button>
    </form>
  );
};

export default BookingForm;
