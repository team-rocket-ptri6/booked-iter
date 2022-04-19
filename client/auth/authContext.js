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

  const tryToGetUser = useCallback(async (callback) => {
    /**
     * Use token in local storage to make request
     * if request is successful, set all data
     * if not, session has expired
    */
    const response = await auth.tryToGetUser(localToken);

    setAuthenticated(auth.isAuthenticated);
    setPassword('password');
    setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MDMyNjI2OSwiZXhwIjoxNjUwNTg1NDY5fQ.ZhHH2TG7iE-OI0CQBR7jP8fZpfAWYiwn_DbG-X1KpWI');
    setFirstName('Evan');
    setLastName('McNeely');
    setEmail('evan@test.com');
    return callback()
  })


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
      // localStorage.setItem('jwt', response.token)
      
      return callback();
    } catch (error) {
      return 'The user could not be signed up!';
    }
  });

  const login = useCallback(async (callback) => {
    const user = {
      password,
      username,
    };

    try {
      const response = await auth.login(user);
      // TO-DO: Added error handling
      setAuthenticated(auth.isAuthenticated);
      setPassword('');
      setToken(response.token);
      setFirstName(response.first_name);
      setLastName(response.last_name);
      setEmail(response.email);
      // localStorage.setItem('jwt', response.token)
      return callback();
    } catch (error) {
      return 'The user could not be logged in';
    }
  });

  const value = { tryToGetUser, username, setUsername, userId, setUserId, email, setEmail, firstName, setFirstName, lastName, setLastName, password, setPassword, description, setDescription, authenticated, setAuthenticated, signUp, token, setToken, login };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an Auth provider');
  return context;
};

export { useAuth, AuthProvider };
