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
  // getting an error because the club is functioning as a foreign key in members and books
  // thus we cannot delete it
  // TODO:
  // we want to delete all books in this club
  // and delete members who only belong to this club

  try {
    const { clubId } = req.body;
    const response = await db.query(queries.deleteClub, [clubId]);
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
