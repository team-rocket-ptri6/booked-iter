const { response } = require('express');
const db = require('../models/database');
const queries = require('../models/queries');

const memberController = {};

memberController.verifyAdmin = async (req, res, next) => {
  const userId = req.user;
  const { clubId } = req.body;

  try {
    const memberResponse = await db.query(queries.findMember, [userId, clubId]);
    if (response.rows.length < 1 || !response.rows[0].admin) {
      throw {
        log: `Member with ID: ${userId} could not be found in club with ID: ${clubId} or the member is not an admin this club.`,
        status: 404,
        message: `Member with ID: ${userId} could not be found in club with ID: ${clubId} or the member is not an admin of this club.`,
      };
    };

    return next();

  } catch (error) {
    return next({
      log: `memberController.verifyAdmin: ERROR: ${error.log}`,
      message: { err: `${error.message ? error.message : 'memberController.verifyAdmin: ERROR: Check server logs for details.'}` },
      status: error.status ? error.status : 500,
    });    
  }
};


module.exports = memberController;