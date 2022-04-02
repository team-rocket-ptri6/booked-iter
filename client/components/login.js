
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/authContext'; 

function Login() {
  const auth = useAuth();

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState(''); 

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
    <><div className="login">
      <h1>Login</h1>
      <input type="text" placeholder="Username..." onChange={(e)=>{setLoginUsername(e.target.value);}}/>
      <input type="text" placeholder="Password..." onChange={(e)=>{setLoginPassword(e.target.value);}}/>
      <button onClick={login}>Login</button>
    </div> 
    </>
  );
}
    
export default Login;