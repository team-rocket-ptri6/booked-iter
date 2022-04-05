import React, { useState, useCallback } from 'react';
import auth from './auth';

const AuthContext = React.createContext();

function AuthProvider({children}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const signUp = useCallback(async (callback) => {
    const user = {
      firstName,
      lastName,
      password,
      email,
      username,
      description
    };
    
    try {
      const response = await auth.signUp(user);
      // TO-DO: Added error handling
      setAuthenticated(auth.isAuthenticated);
      setPassword('');
      setToken(response.token);
      
      return callback();
    } catch (error) {
      
    }

  });

  const value = { username, setUsername, userId, setUserId, email, setEmail, firstName, setFirstName, lastName, setLastName, password, setPassword, description, setDescription, authenticated, setAuthenticated, signUp, token, setToken  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an Auth provider');
  return context;
};

export { useAuth, AuthProvider };
