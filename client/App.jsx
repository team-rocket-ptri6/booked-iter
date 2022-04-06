import React, { useState } from 'react';
import { useAuth } from './auth/authContext';
import UserProfile from './components/UserProfile';

import Signup from './components/Signup';
import Login from './components/Login';
import './stylesheets/styles.css';
import ClubPage from './components/ClubPage';

function App() {
  const auth = useAuth();
  const [showLogin, setShowLogin] = useState('false');

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      {!showLogin ? 
        (<Signup />) :
        (<Login />)
      }
      {showLogin ?
        (<p>Don&apos;t have an account? <span className='underline decoration-sky-500 cursor-pointer' type='button' onClick={toggleForm}>Sign up today!</span></p>) :
        (<p>Have an account? <span className='underline decoration-sky-500 cursor-pointer' type='button' onClick={toggleForm}>Login here.</span></p>)
      }
    </>
  );
}

export default App;
