queries = {};



queries.createUser = `INSERT INTO users (first_name, last_name, email, user_name, password)
    VALUES ($1, $2, $3, $4, $5)
  RETURNING
    user_id, user_name, first_name`;

queries.loginUser = 'SELECT * FROM users WHERE user_name = $1';  

queries.findUser = `SELECT
	user_id
FROM
	users
WHERE
	email = $1`;

queries.addMember = `INSERT INTO members (user_id, club_id)
	VALUES ($1, $2)
RETURNING
	*;`;

queries.createClub = `INSERT INTO clubs (club_name, description)
    VALUES ($1, $2)
  RETURNING club_name, description, club_id`;

queries.findMember = `SELECT
	*
FROM
	members
WHERE
	user_id = $1
	AND club_id = $2
`;

queries.setAdmin = `UPDATE
	members
SET
	admin = TRUE
WHERE
	member_id = $1
RETURNING
	*;`;

queries.getClub = 'SELECT * FROM clubs WHERE club_id = $1'; //club_name or club-id?

module.exports = queries;
