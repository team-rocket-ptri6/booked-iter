
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../auth/authContext'; 

function Signup() {
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await auth.signUp(() => navigate('/profile'));
  }

  return (
    <form className="place-self-center text-gray-800" onSubmit={e => handleSubmit(e)}>
      <h1 className='font-bold text-xl mb-2 text-center'>Welcome to MyBookClub!</h1>
      <div className="signup">
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-6">First Name</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={auth.firstName}onChange={(e)=>{auth.setFirstName(e.target.value);}}/>
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-6">Last Name</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={auth.lastName}onChange={(e)=>{auth.setLastName(e.target.value);}}/>
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-6">Email</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={auth.email}onChange={(e)=>{auth.setEmail(e.target.value);}}/>
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-6">Username</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={auth.username}onChange={(e)=>{auth.setUsername(e.target.value);}}/>
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-6">Password</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" value={auth.password}onChange={(e)=>{auth.setPassword(e.target.value);}}/>
        <div><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-6 px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>Register</button></div>
        
      </div>
    </form>
  );
}
    
export default Signup;