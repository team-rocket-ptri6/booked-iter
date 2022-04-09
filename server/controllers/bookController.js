// mod.cjs
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
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

bookController.getBooksByClub = async (req, res, next) => {
  const { clubId } = req.params;
  try {
    const response = await db.query(queries.getBooksByClub, [clubId]);
    res.locals.books = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `bookController.getBooksByClub: ERROR: ${error}`,
      message: {
        err: 'bookController.getBooksByClub: ERROR: Check server logs for details.',
      },
    });  
  }
};

bookController.getGoogleBooks = async (req, res, next) => {
  try {
    for (let i = 0; i < res.locals.books.length; i++) {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${res.locals.books[i].google_book_id}?fields=id,volumeInfo(title, authors,imageLinks(thumbnail))`);
      const data = await response.json();

      res.locals.books[i].title = data.volumeInfo.title;
      res.locals.books[i].authors = data.volumeInfo.authors;
      res.locals.books[i].thumbnail = data.volumeInfo.imageLinks;
      
    }
    return next();
  } catch (error) {
    return next({
      log: `bookController.getGoogleBooks: ERROR: ${error}`,
      message: {
        err: 'bookController.getGoogleBooks: ERROR: Check server logs for details.',
      },
    });
  }

};

bookController.setCurrentlyReading = async (req, res, next) => {
  const bookId = req.params.bookId;
  const { clubId } = req.body;
  try {
    await db.query(queries.setCurrentlyReadingFalse, [clubId]);
    const repsonse = await db.query(queries.setCurrentlyReadingTrue, [bookId]);
    res.locals.book = repsonse.rows;

    return next();
  } catch (error) {
    return next({
      log: `bookController.setCurrentlyReading: ERROR: ${error}`,
      message: {
        err: 'bookController.setCurrentlyReading: ERROR: Check server logs for details.',
      },
    });  
  }
};

module.exports = bookController;