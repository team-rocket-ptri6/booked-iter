import React, { useState } from 'react';
import { useAuth } from './auth/authContext';
import UserProfile from './components/UserProfile';

import Signup from './components/Signup';
import Login from './components/Login';
import './stylesheets/styles.css';
import ClubPage from './components/ClubPage';
import Book from './assets/book.png';
import BookSearch from './components/BookSearch';

function App() {
  const auth = useAuth();
  const [showLogin, setShowLogin] = useState('false');

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
  //If path is /profile then show userprofile plus all the other page
    //else render this below
    <>
      <div className='book'>
        <div className="back"><img className="logo" src={Book}/></div>

        <div className="page10">
          {!showLogin ?
            (<Signup  />) :
            (<Login />)
          }
 
          {showLogin ?
            (<p className="text">Don&apos;t have an account? <span className="button" type='button' onClick={toggleForm}>Sign up today!</span></p>) :
            (<p className="text">Have an account? <span className="button" type='button' onClick={toggleForm}>Login here</span></p>)
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
          <img className="logo" src={Book}/>
        </div>
      
      </div>
    </>
  );
}

export default App;
