// src/components/BookingForm.tsx
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LocationSearch from './LocationSearch';
import { Form, useNavigate } from 'react-router-dom';
import api from '../API/axiosL&A';
import Cookies from 'js-cookie';
import { UserAccount,RideDetails } from '../Types';


const BookingFormSchema = yup.object().shape({
  destination: yup.string().required('Destination is required'),
  current: yup.string().required('Current is required').notOneOf([yup.ref('destination')], 'Destination and current address should be different'),
  date: yup.string().required('Date is required'),
  time: yup.string().required('Time is required'),
  account: yup.object().shape({
    id: yup.string(),
    name: yup.string(),
    email: yup.string().email('Invalid email format'),
  }),
});

const BookingForm: React.FC<RideDetails> = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [accounts, setAccounts] = useState<UserAccount[]>([]);

  // Fetch account details using Axios on component mount
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        // Make a GET request to fetch account details
        const response = await api.get('DriverAccounts');
        setAccounts(response.data);
      } catch (error) {
       
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);
    // Retrieve values from cookies on component mount
    useEffect(() => {
      const idCookieValue = Cookies.get('idCookie');
      const tokenCookieValue = Cookies.get('tokenCookie');
  
      if (idCookieValue) {
        setId(idCookieValue);
      }
  
      if (tokenCookieValue) {
        setToken(tokenCookieValue);
      }
    }, []);

    const sendRideDetails=async (rideData:RideDetails)=>{
       
        try {
            if(id!=null){
                rideData.id=id;
                
            }
           
            // Make a POST request using Axios
            const response =  await api.post('', rideData);
           
           
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
      status: 1,
      account: { id: '', name: '', email: '' },
    },
    validationSchema: BookingFormSchema,
    onSubmit: (values) => {
        if (token==null){
            alert("Login First");
            navigate("/signIn");
        }
       values.time=new Date(`2000-01-01T${values.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, });
     
       sendRideDetails(values)
    },
  });
  

  return (
    <div className="container">
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Destination</label>
        <LocationSearch address={formik.values.destination} setAddress={formik.setFieldValue.bind(null, 'destination')} />
        {  formik.touched.destination && formik.errors.destination && <div>{formik.errors.destination}</div>}
      </div>
      <div>
        <label>Current</label>
        <LocationSearch address={formik.values.current} setAddress={formik.setFieldValue.bind(null, 'current')} />
        {formik.touched.destination && formik.errors.current && <div>{formik.errors.current}</div>}
      </div>
      <div>
        <label>Driver(Optional)</label>
        <select
          name="account"
          value={formik.values.account.id}
          onChange={(e) => {
            const selectedAccount = accounts.find(account => account.id === e.target.value);
            formik.setFieldValue('account', selectedAccount || { id: '', name: '', email: '' });
          }}
          onBlur={formik.handleBlur}
        >
          <option value="" disabled >Select Driver</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
        {  formik.touched.account && formik.errors.account && (
          <div>{JSON.stringify(formik.errors.account)}</div>
          
        )}
      </div>
      <div>
        <label>Date</label>
        <input type="date" name="date" value={formik.values.date} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.touched.date && formik.errors.date && <div>{formik.errors.date}</div>}
      </div>

      <div>
        <label>Time</label>
        <input type="time"  name="time" value={formik.values.time}  onChange={formik.handleChange} className="form-control" onBlur={formik.handleBlur} />
        {formik.touched.time && formik.errors.time && <div>{formik.errors.time}</div>}
      </div>
      
       
     
      <button type="submit">Book Ride</button>
    </form>
    </div>
  );
};

export default BookingForm;
