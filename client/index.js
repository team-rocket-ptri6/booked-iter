import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/authContext';
import RequireAuth from './components/RequireAuth';
import UserProfile from './components/UserProfile';
import App from './App';
import ClubInfo from './components/ClubInfo';

render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/club' element={<ClubInfo />} />
        <Route path='/profile' element={
          <RequireAuth>
            <UserProfile />
          </RequireAuth>
        } />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
  , document.getElementById('app'));
