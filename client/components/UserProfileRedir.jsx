import React, { useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

function Redirect(){
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate('/profile');
  }

  return (
    <div>
      <button className="editButton" onClick={(e) => handleClick()}>Return to Profile</button>
    </div>
    
     
  );
}

export default Redirect;