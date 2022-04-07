import React, { useState } from 'react';
import { useAuth } from './auth/authContext';
import UserProfile from './components/UserProfile';

import Signup from './components/Signup';
import Login from './components/Login';
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
    <div className='book'>
      {/* <div className="back">back</div> */}

      <div className="page10">
        {!showLogin ?
        (<Signup  />) :
        (<Login />)
      }
        {showLogin ?
          (<p>Don&apos;t have an account? <span type='button' onClick={toggleForm}>Sign up today!</span></p>) :
          (<p>Have an account? <span type='button' onClick={toggleForm}>Login here.</span></p>)
        }
      </div>
      <div className="page9"></div>
      <div className="page8"></div>
      <div className="page7"></div>
      <div className="page6"></div>
      <div className="page5"></div>
      <div className="page4"></div>
      <div className="page3"></div>
      <div className="page2"></div>
      <div className="page1"></div>
      <div className="front">
      <img className="logo" src={Logo}/>
      </div>
        
      </div>
      );
}

export default App;
