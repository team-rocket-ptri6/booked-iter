
import React, { useState } from 'react';
import { useAuth } from '../auth/authContext'; 
import Logo from '../assets/logo.png'

import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png'


function Login() {
  const auth = useAuth();
  const navigate = useNavigate();



  //todo: error handling display on frontend
  async function handleSubmit(e) {
    e.preventDefault();
    await auth.login(() => navigate('/profile'));
  }

  return (
    <><div className="formcontainer">
      {/* <img src={Logo} className="logo"/> */}
      <input type="text" placeholder="Username..." onChange={(e)=>{setLoginUsername(e.target.value);}}/>
      <br/>
      <input type="text" placeholder="Password..." onChange={(e)=>{setLoginPassword(e.target.value);}}/>
      <button className="button" onClick={Login}>Login</button>
    </div> 
    </>
  );
}
    
export default Login;
