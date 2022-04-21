const url = 'http://localhost:8080/users/';
const auth = {
  isAuthenticated: false,
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
      }

      return await response.json();
    }
    catch (error) {
      return console.log('Error with signin', err);
    }
  }
};



export default auth;
