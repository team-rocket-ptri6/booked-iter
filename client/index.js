import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/authContext';
import App from './App';

render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/' element={<App />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
  , document.getElementById('app'));
