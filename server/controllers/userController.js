const db = require('../models/database');
const queries = require('../models/queries');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userController = {};

const regex = new RegExp('\W');

userController.createUser = async (req, res, next) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;
    if (!regex.test(username) || !regex.test(password)) throw 'Username and/or password are blank.';
    const hashPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
    const response = await db.query(queries.createUser, [firstName, lastName, email, username, hashPassword]);
    res.locals = response.rows[0];
    return next();
  } catch (error) {
    return next({
      log: `userController.createUser: ERROR: ${error}`,
      message: { err: 'userController.createUser: ERROR: Check server logs for details.' }
    });
  }
};

userController.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!regex.test(username) || !regex.test(password)) throw 'Username and/or password are blank.';
    const response = await db.query(queries.loginUser, [username]);
    const match = await bcrypt.compare(password, response.rows[0].password);
    if(!match) return res.status(403).send('You have entered invalid username or password.');
    res.locals = {
      user_id: response.rows[0].user_id,
      email: response.rows[0].email,
      first_name: response.rows[0].first_name,
      last_name: response.rows[0].last_name,
      user_name: response.rows[0].username,
      description: response.rows[0].description,
    }; 
    return next();
  }
  catch (error) {
    return next({
      log: `userController.loginUser: ERROR: ${error}`,
      message: { err: 'userController.loginUser: ERROR: Check server logs for details.' }
    });
  }
};

userController.findOneByEmail = async (req, res, next) => {
  const email = req.body.email;
  try {
    const response = await db.query(queries.findUser, [email]);
    if (response.rows.length < 1) {
      throw {
        log: `User with email: ${email} could not be found.`,
        status: 404,
        message: `User with email: ${email} could not be found.`,
      };
    };

    res.locals.user_id = response.rows[0].user_id;
    return next();
  } catch (error) {
    return next({
      log: `userController.findOneByEmail: ERROR: ${error.log}`,
      message: { err: `${error.message ? error.message : 'userController.findOneByEmail: ERROR: Check server logs for details.'}` },
      status: error.status ? error.status : 500,
    });
  }
};

module.exports = userController;