import React, { useState } from 'react';
import axios from 'axios';
// import UserProfile from './components/UserProfile';

function App() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

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

  //todo: error handling display on frontend
  const login = () => {
    axios.post('http://localhost:8080/users/login', {
      username: loginUsername,
      password: loginPassword, 
    }).then((response) => {
      console.log(response);
      if (response.data.length > 0){
        console.log('successful login');
      }
    });
  };

  return (
    <>
    
    <div>Welcome to MyBookClub!</div>
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
      <div className="login">
        <h1>Login</h1>
        <input type="text" placeholder="Username..." onChange={(e)=>{setLoginUsername(e.target.value);}}/>
        <input type="text" placeholder="Password..." onChange={(e)=>{setLoginPassword(e.target.value);}}/>
        <button onClick={login}>Login</button>
      </div>
      {/* <UserProfile />  */}
    </>
  );
}

export default App;
