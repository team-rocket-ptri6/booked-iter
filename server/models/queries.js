queries = {};

queries.getClubMessages = `
  WITH club_members AS (
    SELECT member_id, admin FROM members
    WHERE club_id = $1
  )
  SELECT * FROM messages m
  JOIN club_members cm ON cm.member_id = m.member_id
  ORDER BY created_at DESC
  LIMIT 100
  `;
queries.removeAdmin = `UPDATE
	members
SET
	admin = FALSE
WHERE
	member_id = $1
RETURNING
	*;`;
queries.addNewMessage = `
INSERT INTO messages (member_id, message, edited)
VALUES ($1, $2, $3)
RETURNING *
`;

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

queries.deleteMessagesForDeleteClub = 'DELETE from messages WHERE member_id IN (SELECT member_id from members WHERE club_id = $1) RETURNING *';
queries.deleteQuestionsForDeleteClub = 'DELETE from questions WHERE member_id IN (SELECT member_id from members WHERE club_id = $1) RETURNING *';
queries.deleteMembersForDeleteClub = 'DELETE from members WHERE club_id = $1 RETURNING *';
queries.deleteBooksForDeleteClub = 'DELETE from books WHERE club_id = $1 RETURNING *';
queries.deleteClub = 'DELETE from clubs	WHERE club_id = $1 RETURNING *';


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

queries.addQuestion = `WITH new_question AS (
INSERT INTO questions (question, member_id)
		VALUES ($1, $2)
	RETURNING
		*)
	SELECT
		new_question.question as question,
		user_info."firstName" as "firstName",
		user_info."lastName" as "lastName"
	FROM
		new_question
		JOIN (
			SELECT
				members.member_id AS member_id, members.user_id AS user_id,
				users.first_name AS "firstName",
				users.last_name AS "lastName",
				users.user_name AS username
			FROM
				members
				JOIN users ON members.user_id = users.user_id) AS user_info ON new_question.member_id = user_info.member_id`;

queries.getClubMembers = `SELECT
	members.member_id as member_id,
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

queries.getClubQuestions = `SELECT
	question_id,
	question,
	members.first_name AS "firstName",
	members.last_name AS "lastName",
	user_id
FROM
	questions
	JOIN (
		SELECT
			members.member_id AS member_id,
			members.user_id AS user_id,
			users.first_name AS first_name,
			users.last_name AS last_name,
			users.user_name AS username
		FROM
			members
			JOIN clubs ON members.club_id = clubs.club_id
			JOIN users ON members.user_id = users.user_id
		WHERE
			clubs.club_id = $1) AS members ON questions.member_id = members.member_id
`;
queries.getClubsByUser = `SELECT
	clubs.club_id as club_id,
	clubs.club_name as "clubName",
	clubs.description as description
FROM
	members
	JOIN clubs ON members.club_id = clubs.club_id
WHERE
	members.user_id = $1`;

queries.saveBook = `INSERT INTO books (google_book_id, club_id, to_read, book_votes)
	VALUES ($1, $2, TRUE, 1)
RETURNING
	*`;

queries.getBooksByClub = `SELECT
	*
FROM
	books
WHERE
	club_id = $1`;

queries.setCurrentlyReadingTrue = `UPDATE
	books
SET
	currently_reading = TRUE
WHERE
	book_id = $1
RETURNING
	*;`;

queries.setCurrentlyReadingFalse = `UPDATE
	books
SET
	currently_reading = FALSE
WHERE
	currently_reading = TRUE
	AND club_id = $1
RETURNING
	*;`;

queries.setHasReadTrue = `UPDATE
	books
SET
	has_read = TRUE
WHERE
	book_id = $1
RETURNING
 *;`;

queries.addReadDate = `UPDATE
 books
SET
 date_read = $1
WHERE
 book_id = $2
RETURNING
*;`;


module.exports = queries;
