import React, { useState } from 'react';
import { useAuth } from './auth/authContext';
import UserProfile from './components/UserProfile';


import Signup from './components/signup';
import Login from './components/login';
import './stylesheets/styles.css';
import ClubPage from './components/ClubPage';
import Logo from './assets/logo.png'

function App() {
  const auth = useAuth();
  const [showLogin, setShowLogin] = useState('false');

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div class='book'>
      <div class="back">back</div>

      <div class="page10">
        {!showLogin ?
        (<Signup  />) :
        (<Login />)
      }
        {showLogin ?
          (<p>Don&apos;t have an account? <span type='button' onClick={toggleForm}>Sign up today!</span></p>) :
          (<p>Have an account? <span type='button' onClick={toggleForm}>Login here.</span></p>)
        }
      </div>
      <div class="page9"></div>
      <div class="page8"></div>
      <div class="page7"></div>
      <div class="page6"></div>
      <div class="page5"></div>
      <div class="page4"></div>
      <div class="page3"></div>
      <div class="page2"></div>
      <div class="page1"></div>
      <div class="front">
      <img className="logo" src={Logo}/>
      </div>
        
      </div>
      );
}

export default App;
