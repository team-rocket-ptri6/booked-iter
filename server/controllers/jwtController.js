const db = require('../models/database');
const queries = require('../models/queries');
const jwt = require('jsonwebtoken');
require('dotenv').config;

const jwtController = {};

jwtController.generateToken = async (req, res, next) => {
  try {
    const payload = {
      userName: res.locals.user_name,
      userId: res.locals.user_id
    };
    const options = {
      expiresIn: '2h',
    };
    const token = await jwt.sign(payload, process.env.SECRET_KEY, options);
    res.locals.token = token;
    
    return next();
  } 
  catch (error) {
    return next({
      log: `jwtController.generateToken: ERROR: ${error}`,
      message: { err: 'jwtController.generateToken: ERROR: Check server logs for details.' }
    });
  }
};


module.exports = jwtController;
