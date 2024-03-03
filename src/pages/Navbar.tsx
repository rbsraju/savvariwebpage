// Navbar.js
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import  { RootState } from '../store';
import { clearToken } from '../Slices/authSlice';
import Cookies from 'js-cookie';

const  Navbar:React.FC = () => {
  const [token, setToken] = useState<string>('');
  

  // Retrieve values from cookies on component mount
  useEffect(() => {
  
    const getTokenFromCookie = async () => {
      const tokenCookieValue = Cookies.get('tokenCookie');
      if (tokenCookieValue) {
        setToken(tokenCookieValue);
      }
    };
    getTokenFromCookie();
  },[]);
   const handleClearToken=() => {
    Cookies.set('tokenCookie','', { expires: new Date(0) })
    Cookies.set('idCookie','', { expires: new Date(0) })
    Cookies.set('roleCookie','', { expires: new Date(0) })

    setToken('');
   }
   

  return (
    <div className="navbar">
      <div className="logo"><a className='nav-link-a' href="/">Savvari</a></div>
      <div className="nav-links">
      {token==''?(
      <div><a className='nav-link-a' href="/signIn">Sign In</a>
      <a className='nav-link-a' href="/signUp">Sign Up</a></div>):(
      <div><a onClick={handleClearToken}>SignOut</a></div>)}
      
      </div>
    </div>
  );
};

export default Navbar;
