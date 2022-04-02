const auth = {
  isAuthenticated: false,
  url: 'http://localhost:8080/users/',
};

auth.signUp = async (user) => {
  options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  body = JSON.stringify(user);
  
  try {
    const response = await fetch(`${this.url}signup`, options);
    if (response.ok) {
      this.isAuthenticated = true;
    }
    
    return await response.json();
  } 
  catch (error) {
    return console.log('Error with signin', err);
  }
};

export default auth;
