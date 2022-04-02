
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
    <><div>Welcome to MyBookClub!</div>
      <div className="signup">
        <h1>Sign Up</h1>
        <label>Firstname</label>
        <input type="text" onChange={(e)=>{setFirstName(e.target.value);}}/>
        <label>Lastname</label>
        <input type="text" onChange={(e)=>{setLastName(e.target.value);}}/>
        <label>Email</label>
        <input type="text" onChange={(e)=>{setEmail(e.target.value);}}/>
        <label>Username</label>
        <input type="text" onChange={(e)=>{setUsername(e.target.value);}}/>
        <label>Password</label>
        <input type="text" onChange={(e)=>{setPassword(e.target.value);}}/>
        <button onClick={signUp}>Register</button>
      </div>
    </>
  );
}
    
export default Signup;