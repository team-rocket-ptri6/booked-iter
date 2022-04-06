
import React, { useState } from 'react';
import { useAuth } from '../auth/authContext'; 
import { useNavigate } from 'react-router-dom';

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();



  //todo: error handling display on frontend
  async function handleSubmit(e) {
    e.preventDefault();
    await auth.login(() => navigate('/profile'));
  }

  return (
    <>
      <form className = "items-center text-gray-800" id='login' onSubmit={e => handleSubmit(e)}>
        <h1 className="font-bold text-xl mb-2 text-center">Login</h1>

        <label className="block text-gray-700 text-sm font-bold mb-2 pt-6" htmlFor="userName">Username</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " id='userName' type="text" placeholder="Username" value={auth.username} onChange={(e)=>{auth.setUsername(e.target.value);}}/>

        <label className="block text-gray-700 text-sm font-bold mb-2 pt-6" htmlFor="password">Password</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " type="password"  placeholder="******************" id='password' value={auth.password} onChange={(e)=>{auth.setPassword(e.target.value);}}/>
        <div><button form='login' value='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-6 px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>Login</button></div>
      
      </form> 
    </>
  );
}
    
export default Login;
