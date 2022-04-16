
import React, { useState } from 'react';
import { useAuth } from '../auth/authContext'; 
import { useNavigate } from 'react-router-dom';
import Small from '../assets/smalllogo.png';

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();



  //todo: error handling display on frontend
  async function handleSubmit(e) {
    e.preventDefault();
    await auth.login(() => {
      console.log(response);
      navigate('/profile');
    });
  }

  return (
    <div> 
      <img className="small" src={Small} />
      <form className="formContainer" id='login' onSubmit={e => handleSubmit(e)}>
        
        <h1 className="text">Welcome!</h1>
        
        <h3 className="text">Log in to your account here...</h3>

        <label className="text" htmlFor="userName">Username</label>
        <input id='userName'  type="text" value={auth.username} onChange={(e)=>{auth.setUsername(e.target.value);}}/>

        <label className="text" htmlFor="password">Password</label>
        <input type="password"  id='password' value={auth.password} onChange={(e)=>{auth.setPassword(e.target.value);}}/>
        <div>
          <br/>
          <button className="button" form='login' value='submit'>Login</button></div>
      
      </form> 
    </div>
  );
   
}
    
export default Login;
