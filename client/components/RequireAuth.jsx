import React from 'react';
import { useAuth } from '../auth/authContext';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (localStorage.getItem('user')) return children;

  if (!auth.authenticated) return <Navigate to="/" state={{ from: location }} replace/>;

  return children;
}

export default RequireAuth;