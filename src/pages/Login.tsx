import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
//import '../css/Login.css'; // Import your CSS file
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../Slices/authSlice';
import { Navigate, redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { setID, setRole } from '../Slices/idSlice';


interface FormData {
    
    email: string;
    password: string;
    // Add other fields as needed
  }
const Login: React.FC=() => {
    const navigate = useNavigate();
  
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const[error, setError]=useState<string>('');

    
     

     const  callApi= async(values: FormData)=>{
        try {
            // Make a POST request using Axios
             await axios.post('https://localhost:7151/api/Authentication', values)
            .then(response=>{
                Cookies.set('tokenCookie',response.data.token);
                Cookies.set('idCookie',response.data.id);
                Cookies.set('roleCookie',response.data.role);
                navigate('/');
            })
            .catch(error=>{
                if(error.response.status==400)
                {
                  setShowSuccessAlert(true);
                  alert(error.response.data);
                  setTimeout(() => {
                    setShowSuccessAlert(false);
                    setError('');
                  }, 2000);
                }else if(error.response.status==404)
                {
                  setShowSuccessAlert(true);
                  setError('Wrong Credintials');
               
                  setTimeout(() => {
                    setShowSuccessAlert(false);
                    setError('');
                  }, 2000);
                }
            });
       
          } catch (error) {
            // Handle errors
            
            console.error('Error:', error);
          }
      }
 
     
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
      
       callApi(values);
       
    },
  });

  return (
    <div className="container">
        {showSuccessAlert && (
        <div className="alert alert-success mt-3" role="alert" >
         {error}
        </div>
      )}
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">email</label>
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
          <label htmlFor="password">Password</label>
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
        <button  type="submit">Submit</button>
        
      </form>
    </div>
  );
};

export default Login;
