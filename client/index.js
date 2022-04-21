import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/authContext';
import RequireAuth from './components/RequireAuth';
import UserProfile from './components/UserProfile';
import App from './App';
import ClubPage from './components/ClubPage';

render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/:id"
          element={
            <RequireAuth>
              <ClubPage />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('app')
);
