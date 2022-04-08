
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../auth/authContext'; 
import Small from '../assets/smalllogo.png'

function Signup() {
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await auth.signUp(() => navigate('/profile'));
  }

  return (
    <div>
      <img className="small" src={Small}/>
      <h1 className="text" >Sign up here...</h1>
    <form onSubmit={e => handleSubmit(e)}>
      
      <div className="formContainer">
        {/* <label>First Name</label> */}
        <input type="text" placeholder="First Name" value={auth.firstName}onChange={(e)=>{auth.setFirstName(e.target.value);}}/>
        <br/>
        {/* <label>Last Name</label> */}
        <input type="text" placeholder="Last Name" value={auth.lastName}onChange={(e)=>{auth.setLastName(e.target.value);}}/>
        <br/>
        {/* <label>Email</label> */}
        <input type="text" placeholder="Email" value={auth.email}onChange={(e)=>{auth.setEmail(e.target.value);}}/>
        <br/>
        {/* <label>Username</label> */}
        <input type="text" placeholder="Username" value={auth.username}onChange={(e)=>{auth.setUsername(e.target.value);}}/>
        <br/>
        {/* <label >Password</label> */}
        <input  type="password" placeholder ="Password" value={auth.password}onChange={(e)=>{auth.setPassword(e.target.value);}}/>
        <div><button className="button" type='submit'>Register</button></div>
        </div>
      
    </form>
    </div>
  );
}
    
export default Signup;