const url = 'http://localhost:8080/users/';
const auth = {
  isAuthenticated: false,
  // errorMsg: false,
  signUp: async function (user) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(`${url}signup`, options);
      if (response.ok) {
        this.isAuthenticated = true;
      }

      return await response.json();
    }
    catch (error) {
      return console.log('Error with signin', err);
    }
  },
  login: async function (user) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(`${url}login`, options);
      if (response.ok) {
        this.isAuthenticated = true;
      } else {
        alert('Your password or username is incorrect :(');
      }

      return await response.json();
    }
    catch (error) {
      return console.log('Error with signin', err);
    }
  },
  persist: async function () {
    
    try {
      const response = await fetch(`${url}isAuth`, {method: 'GET'});
      if (response.ok) {
        this.isAuthenticated = true;
      }

      return await response.json();

    } catch (error) {
      return console.log('Error with checking for logged in user', err);
    }
  }
};



export default auth;
