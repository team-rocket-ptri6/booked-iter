
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/authContext'; 
import Logo from '../assets/logo.png'


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
      <div className="formContainer">
        {/* <img src={Logo} className="logo"/> */}
        <label>First Name</label>
        <input type="text" onChange={(e)=>{setFirstName(e.target.value);}}/>
        <label>Last Name</label>
        <input type="text" onChange={(e)=>{setLastName(e.target.value);}}/>
        <label>Email</label>
        <input type="text" onChange={(e)=>{setEmail(e.target.value);}}/>
        <label>Username</label>
        <input type="text" onChange={(e)=>{setUsername(e.target.value);}}/>
        <label>Password</label>
        <input type="text" onChange={(e)=>{setPassword(e.target.value);}}/>
        <button className="button" onClick={signUp}>Register</button>
      </div>
    
  );
}
    
export default Signup;