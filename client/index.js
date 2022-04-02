import React from 'react';
import { render } from 'react-dom';
import { AuthProvider } from './auth/authContext';
import App from './App';

render(
  <AuthProvider>
    <App />
  </AuthProvider>
  , document.getElementById('app'));
