import React, { useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { useAuth } from '../auth/authContext';

function Redirect(){
  const navigate = useNavigate();
  const auth = useAuth();

  function handleClick(e) {
    e.preventDefault();
    navigate('/profile');
  }

  return (
    <button className="editButton" onClick={(e) => handleClick()}>Return to Profile</button>
    
    
     
  );
}

export default Redirect;