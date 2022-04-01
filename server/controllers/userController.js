const db = require('../models/database');
const queries = require('../models/queries');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const {username, password, email, firstName, lastName} = req.body;
    const hashPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
    const response = await db.query(queries.createUser, [firstName, lastName, email, username,hashPassword]);
    res.locals = response.rows;
    next();
  } catch (error) {
    return next({
      log: `userController.createUser: ERROR: ${err}`,
      message: { err: 'userController.createUser: ERROR: Check server logs for details.' }
    });
}
};

module.exports = userController;