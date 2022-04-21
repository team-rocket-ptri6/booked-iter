const db = require('../models/database');
const queries = require('../models/queries');

const clubController = {};

clubController.createClub = async (req, res, next) => {
  try {
    const { clubName, clubDescription } = req.body;
    const response = await db.query(queries.createClub, [
      clubName,
      clubDescription,
    ]);
    res.locals = response.rows[0];
    res.locals.user_id = req.user;
    return next();
  } catch (error) {
    return next({
      log: `clubController.createClub: ERROR: ${error}`,
      message: {
        err: 'clubController.createClub: ERROR: Check server logs for details.',
      },
    });
  }
};

clubController.getClub = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await db.query(queries.getClub, [id]);
    res.locals = response.rows[0];
    return next();
  } catch (error) {
    return next({
      log: `clubController.getClub: ERROR: ${error}`,
      message: {
        err: 'clubController.getClub: ERROR: Check server logs for details.',
      },
    });
  }
};

clubController.getClubsByUser = async (req, res, next) => {
  const userId = req.user;
  try {
    const response = await db.query(queries.getClubsByUser, [userId]);
    res.locals.clubs = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `clubController.getClubsByUser: ERROR: ${error}`,
      message: {
        err: 'clubController.getClubsByUser: ERROR: Check server logs for details.',
      },
    });
  }
};

clubController.deleteClub = async (req, res, next) => {

  try {
    const { clubId } = req.body;

    //first delete messages associated with members in the club we want to delete
    //then delete questions associated with those members
    //then delete the members from the members table
    //then delete books associated with the club
    //finally we can delete the club from the clubs table

    const deleteMessages = await db.query(queries.deleteMessagesForDeleteClub, [clubId]);
    const deleteQuestions = await db.query(queries.deleteQuestionsForDeleteClub, [clubId]);
    const deleteMembers = await db.query(queries.deleteMembersForDeleteClub, [clubId]);
    const deleteBooks = await db.query(queries.deleteBooksForDeleteClub, [clubId]);
    const response = await db.query(queries.deleteClub, [clubId]);

    // return deleted club info
    res.locals.club = response.rows[0];
    return next();
  } catch (error) {
    return next({
      log: `clubController.deleteClub: ERROR: ${error}`,
      message: {
        err: 'clubController.deleteClub: ERROR: Check server logs for details.',
      },
    });
  }
};


module.exports = clubController;
