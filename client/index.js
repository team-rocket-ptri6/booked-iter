import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/authContext';
import RequireAuth from './components/RequireAuth';
import UserProfile from './components/UserProfile';
import App from './App';
import ClubInfo from './components/ClubInfo';
import ClubPage from './components/ClubPage';
import ClubMessages from './components/ClubMessages';

render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/club" element={<ClubInfo />} /> */}
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
              <Routes>
                {/* <ClubInfo /> */}
                <Route path="info" element={<ClubInfo />} />
                {/* <Route path='messages' element={<ClubMessages />}/>
            <Route path='books' element={<BookPanel />}/> */}
                {/* <Route path='read' element={<BooksRead />}/> ---> This one is for gerry*/}
              </Routes>
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('app')
);
