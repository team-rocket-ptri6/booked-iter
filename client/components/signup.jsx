
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/authContext'; 

function Signup() {
  const auth = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signUp = () => {
    axios.post('http://localhost:8080/users/signup', {
      username: username,
      password: password, 
      email: email, 
      firstName: firstName,
      lastName: lastName, 
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <form className="place-self-center text-gray-800">
      <h1 className='font-bold text-xl mb-2 text-center'>Welcome to MyBookClub!</h1>
      <div className="signup">
        {/* <h1>Sign Up</h1> */}
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-6">Firstname</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={(e)=>{setFirstName(e.target.value);}}/>
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-6">Lastname</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={(e)=>{setLastName(e.target.value);}}/>
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-6">Email</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={(e)=>{setEmail(e.target.value);}}/>
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-6">Username</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={(e)=>{setUsername(e.target.value);}}/>
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-6">Password</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={(e)=>{setPassword(e.target.value);}}/>
        <div><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-6 px-4 rounded focus:outline-none focus:shadow-outline" onClick={signUp}>Register</button></div>
        
      </div>
    </form>
  );
}
    
export default Signup;