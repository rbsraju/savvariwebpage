// Navbar.js
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import  { RootState } from '../store';
import { clearToken } from '../Slices/authSlice';
import Cookies from 'js-cookie';
import { useAuth } from '../AuthContext';

const  Navbar:React.FC = () => {
  
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  // Retrieve values from cookies on component mount
  useEffect(() => {
  
    const getTokenFromCookie = async () => {
      const tokenCookieValue = Cookies.get('tokenCookie');
      if (tokenCookieValue) {
        setIsLoggedIn(true);
      }
    };
    getTokenFromCookie();
  },[isLoggedIn]);
   const handleClearToken=() => {
    Cookies.remove('tokenCookie');
    Cookies.remove('idCookie');
    Cookies.remove('roleCookie');
    setIsLoggedIn(false);
    
   }
   

  return (
    <div className="navbar">
      <div className="logo"><a className='nav-link-a' href="/">Savvari</a></div>
      <div className="nav-links">
      {!isLoggedIn?(
      <div><a className='nav-link-a' href="/signIn">Sign In</a>
      <a className='nav-link-a' href="/signUp">Sign Up</a></div>):(
      <div><a onClick={handleClearToken}>SignOut</a></div>)}
      
      </div>
    </div>
  );
};

export default Navbar;
