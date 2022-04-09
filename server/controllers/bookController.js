const { response } = require('express');
const db = require('../models/database');
const queries = require('../models/queries');

const bookController = {};

bookController.saveBook = async (req, res, next) => {
  const { googleBookId, clubId } = req.body;
  try {
    const response = await db.query(queries.saveBook, [googleBookId, clubId]);
    res.locals.books = response.rows[0];

    return next();
  } catch (error) {
    return next({
      log: `bookController.saveBook: ERROR: ${error}`,
      message: {
        err: 'bookController.saveBook: ERROR: Check server logs for details.',
      },
    });
  }
};

module.exports = bookController;