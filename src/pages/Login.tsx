import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../css/Login.css'; // Import your CSS file
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../Slices/authSlice';
import { Navigate, redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface FormData {
    
    email: string;
    password: string;
    // Add other fields as needed
  }
const Login: React.FC=() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        // Your form data fields
    
        email: '',
        password:''
        // Add more fields as needed
      });
      useEffect( ()=>{
         async function checkDetails() {
                  console.log('Checking details');
            try {
                // Make a POST request using Axios
                const response = await axios.post('https://localhost:7151/api/Authentication', formData);
               
                dispatch(setToken(response.data.Result));
                // Handle the response if needed
                navigate('/')
              } catch (error) {
                // Handle errors
                console.error('Error:', error);
              }
         }
        checkDetails();
      },[formData]);
    
     
  const formik = useFormik({
    initialValues: {
        email: '',
      password: '',
    },
    validationSchema: Yup.object({
        email: Yup.string().required('email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values:FormData ) => {
        setFormData(values);
       console.log(formData.email);
       
    },
  });

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">email:</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="email">{formik.errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
