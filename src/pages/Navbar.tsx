// Navbar.js
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import  { RootState } from '../store';
import { clearToken } from '../Slices/authSlice';

const  Navbar:React.FC = () => {
    const [token, setToken] = useState<string>('');
    const dispatch = useDispatch();
    const jwt = useSelector((state: RootState) => state.auth.token);
    useEffect(()=>{
        
        setToken(jwt||'');
    })
   const handleClearToken=() => {
    dispatch(clearToken())
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
