import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import '../css/SignUp.css';
interface signInData{
     name: string,
      email: string,
      phoneNumber: string,
      gender: string,
      password: string,
      confirmPassword: string,
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const senddata= async (values:signInData)=>{

    try{
      await axios.post('https://localhost:7151/api/UserDetails', values)
      .then( Response=>{   navigate('/');})
      .catch(error=>{
        alert(error.response.status);
      })
    }catch{

    }

  }
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      gender: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Full Name is required')
       .matches(/^[A-Za-z]+$/, 'Full Name should only contain characters'),
      email: Yup.string().email('Invalid email address').required('Email is required')
      .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,'Invalid email address'),
      phoneNumber: Yup.string().required('Phone Number is required')
      .matches(/^\d{10}$/, 'Phone Number must be exactly 10 digits'),
      gender: Yup.string().required('Gender is required'),
      password: Yup.string().required('Password is required'). matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Password must be at least 8 characters and contain at least one letter and one number'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: (values:signInData) => {
      senddata(values);
    },
  });

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className="error">{formik.errors.phoneNumber}</div>
          )}
        </div>
        <div className="form-group gender-group">
          <label className='gender-label'>Gender</label>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.gender === 'male'}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.gender === 'female'}
              />
              Female
            </label>
          </div>
          {formik.touched.gender && formik.errors.gender && (
            <div className="error">{formik.errors.gender}</div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="error">{formik.errors.confirmPassword}</div>
          )}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
