const db = require('../models/database');
const queries = require('../models/queries');

const clubController = {};

clubController.createClub = async (req, res, next) => {
  try {
    const { clubName, clubDescription } = req.body;
    const response = await db.query(queries.createClub, [clubName, clubDescription]);
    res.locals = response.rows[0];
    return next();    
  } catch (error) {
    return next({
      log: `clubController.createClub: ERROR: ${error}`,
      message: { err: 'clubController.createClub: ERROR: Check server logs for details.' }
    });
        
  }
};

module.exports = clubController;
