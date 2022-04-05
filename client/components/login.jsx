
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
    <><form className = "items-center text-gray-800 ">
      <h1 className="font-bold text-xl mb-2 text-center" >Login</h1>

      <label className="block text-gray-700 text-sm font-bold mb-2 pt-6" htmlFor="userName">Username</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " type="text" placeholder="Username" onChange={(e)=>{setLoginUsername(e.target.value);}}/>

      <label className="block text-gray-700 text-sm font-bold mb-2 pt-6" htmlFor="password">Password</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " type="text"  placeholder="******************" onChange={(e)=>{setLoginPassword(e.target.value);}}/>
      <div><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-6 px-4 rounded focus:outline-none focus:shadow-outline" onClick={login}>Login</button></div>
      
    </form> 
    </>
  );
}
    
export default Login;
