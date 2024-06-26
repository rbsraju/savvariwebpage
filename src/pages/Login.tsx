import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../Slices/authSlice';
import { Navigate, redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import{ LoginFormData, UserAccount} from '../Types';
import { setID, setRole } from '../Slices/idSlice';
import api from '../API/axiosL&A';
import setUser from '../Slices/userSlice';

import { RootState } from '../store';
import { useAuth } from '../AuthContext';



const Login: React.FC=() => {
  const dispatch = useDispatch();
 
    const navigate = useNavigate();
    
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const[error, setError]=useState<string>('');
    const {  setIsLoggedIn } = useAuth();
    
     

     const  callApi= async(values: LoginFormData)=>{
        try {
        
             await api.post('Aunticate', values)
            .then(response=>{
             
                Cookies.set('tokenCookie',response.data.token);
                Cookies.set('idCookie',response.data.id);
                Cookies.set('roleCookie',response.data.role);
                
              setIsLoggedIn(true);
              const user = response.data as UserAccount; 
              
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
    onSubmit: (values:LoginFormData ) => {
      
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
