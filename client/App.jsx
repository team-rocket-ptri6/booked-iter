import React, { useState } from 'react';
import { useAuth } from './auth/authContext';
import Signup from './components/signup';
import Login from './components/login';

function App() {
  const auth = useAuth();

  return (
    <><Signup />
      <Login />
    </>
  );
}

export default App;
