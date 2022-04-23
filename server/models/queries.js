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

queries.findUserId = `SELECT
	user_id, first_name, user_name
FROM
	users
WHERE
	user_id = $1`;

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

queries.changeClubDescription = 'UPDATE clubs SET description = $2 WHERE club_id = $1';


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
	VALUES ($1, $2, TRUE, 0)
RETURNING
	*`;

queries.createNewBookRating = `
INSERT INTO book_ratings (book_id, username)
	VALUES ($1, $2)
RETURNING
	*`;


queries.getBooksByClub = `
SELECT * FROM books WHERE club_id = $1`;

// queries.getBooksByClub = `SELECT
// 	b.book_id, b.club_id, b.google_book_id,
// 	b.currently_reading, b.to_read, b.book_votes,
// 	b.has_read, b.date_read, br.rating_id,
// 	br.rating, br.review
// FROM
// 	books AS b
// LEFT JOIN book_ratings br
// ON b.book_id = br.book_id
// WHERE
// 	b.club_id = $1`;

queries.getBooksByClubAndRating = `SELECT
	b.book_id, b.club_id, b.google_book_id,
	b.currently_reading, b.to_read, b.book_votes,
	b.has_read, b.date_read, br.rating_id, br.rating, br.review, br2.avg_rating, br2.num_rating
FROM
	books AS b
LEFT JOIN ( SELECT * FROM book_ratings AS brat
	WHERE brat.username = $2 ) AS br
ON b.book_id = br.book_id
LEFT JOIN (SELECT book_id, AVG(rating) AS avg_rating,
COUNT(rating) AS num_rating FROM book_ratings
WHERE rating IS NOT NULL
GROUP BY book_id) AS br2
ON b.book_id = br2.book_id
WHERE b.club_id = $1
`;

queries.getVoterStatus = 'SELECT voted FROM members WHERE member_id = $1';

queries.voteForBook = 'UPDATE books SET book_votes = book_votes + 1 WHERE book_id = $1';

queries.toggleVoterStatus = 'UPDATE members SET voted = NOT voted WHERE member_id = $1';

queries.resetClubVoters = 'UPDATE members SET voted = false WHERE club_id = $1';

queries.resetBookVotes = 'UPDATE books SET book_votes = 0 WHERE club_id = $1';

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



queries.deleteReadBook = `DELETE FROM books
WHERE book_id = $1 RETURNING *`;

queries.deleteBookRating = `DELETE from book_ratings
WHERE rating_id IN (SELECT rating_id from book_ratings WHERE book_id = $1) RETURNING *`;


queries.addBookRating = `INSERT INTO book_ratings (book_id)
VALUES ($1)
RETURNING
*;`;

queries.updateBookRating = `UPDATE
book_ratings
SET
rating = $1
WHERE
book_id = $2
RETURNING
*;`;

queries.updateBookReview = `UPDATE
book_ratings
SET
review = $1
WHERE
book_id = $2
RETURNING
`;

queries.submitNewRatingAndNotes = `INSERT
INTO book_ratings AS br (book_id, username, rating, review)
VALUES($1, $2, $3, $4)
ON CONFLICT (book_id, username)
WHERE book_id IS NOT NULL AND username IS NOT NULL
DO UPDATE
SET rating = $3, review = $4
`;

module.exports = queries;
