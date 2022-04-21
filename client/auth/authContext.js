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
  const [errorMsg, setErrorMsg] = useState(false);

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
      // if (response.data.mailError) return 'There is already an account associated with this email address.';
      // if (response.data.nameError) return 'This username is already in use.';
      // return 'The user could not be signed up!';
    }
  });

  const login = useCallback(async (callback) => {
    const user = {
      password,
      username,
    };
    try {
      const response = await auth.login(user);

      setAuthenticated(auth.isAuthenticated);
      setPassword('');
      setToken(response.token);
      setFirstName(response.first_name);
      setLastName(response.last_name);
      setEmail(response.email);
      return callback();
    } catch (error) {
      setErrorMsg(true);
      console.log('inside catch');
      setPassword('');
      setUsername('');
      return 'The user could not be logged in';
      
    }
  });

  const value = { username, setUsername, userId, setUserId, email, setEmail, firstName, setFirstName, lastName, setLastName, password, setPassword, description, setDescription, authenticated, setAuthenticated, signUp, token, setToken, errorMsg, setErrorMsg, login };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an Auth provider');
  return context;
};

export { useAuth, AuthProvider };
