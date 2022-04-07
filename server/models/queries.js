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

queries.getClub = 'SELECT * FROM clubs WHERE club_id = $1'; //club_name or club-id?

queries.addMember = `INSERT INTO members (user_id, club_id)
	VALUES ($1, $2)
RETURNING
	*;`;

queries.getClub = 'SELECT * FROM clubs WHERE club_id = $1'; //club_name or club-id?

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


queries.deleteMember = `DELETE FROM members
WHERE member_id = $1
RETURNING
*;`;

queries.getClub = 'SELECT * FROM clubs WHERE club_id = $1'; //club_name or club-id?

queries.findMember = `SELECT
	*
FROM
	members
WHERE
	user_id = $1
	AND club_id = $2
`;
queries.addMember = `INSERT INTO members (user_id, club_id, admin)
	VALUES ($1, $2, $3)
RETURNING
	*;`;

queries.getClubMembers = `SELECT
	members.user_id as user_id,
	users.first_name as "firstName",
	users.last_name as "lastName",
	users.user_name as username,
	members.admin as "isAdmin"
FROM
	members
	JOIN users ON members.user_id = users.user_id
WHERE
	club_id =  $1`;


module.exports = queries;
