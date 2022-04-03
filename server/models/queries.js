queries = {};

queries.createUser = `INSERT INTO users (first_name, last_name, email, user_name, password)
    VALUES ($1, $2, $3, $4, $5)
  RETURNING
    user_id, user_name, first_name`;

queries.loginUser = 'SELECT * FROM users WHERE user_name = $1';   

queries.getClub = 'SELECT * FROM clubs WHERE club_id = $1'; //club_name or club-id?

module.exports = queries;