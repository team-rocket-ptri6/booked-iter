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
    // console.log('saved response in bookController.saveBook is: ', res.local.books);


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

bookController.getBooksByClubAndRating = async (req, res, next) => {
  const { clubId, username } = req.params;
  // console.log('username in getBooksByClubandRating :', username);
  try {
    const response = await db.query(queries.getBooksByClubAndRating, [clubId, username]);
    res.locals.books = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `bookController.getBooksByClubAndRating: ERROR: ${error}`,
      message: {
        err: 'bookController.getBooksByClubAndRating: ERROR: Check server logs for details.',
      },
    });
  }
};

bookController.getGoogleBooks = async (req, res, next) => {
  try {
    for (let i = 0; i < res.locals.books.length; i++) {
      // console.log('google book id: ', res.locals.books[i].google_book_id);
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

bookController.markAsRead = async (req, res, next) => {
  const bookId = req.params.bookId;
  const { clubId } = req.body;
  const currDate = new Date();
  try {
    const response = await db.query(queries.setHasReadTrue, [bookId]);
    await db.query(queries.setCurrentlyReadingFalse, [clubId]);
    await db.query(queries.addReadDate, [currDate, bookId]);
    res.locals.book = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `bookController.markAsRead: ERROR: ${error}`,
      message: {
        err: 'bookController.markAsRead: ERROR: Check server logs for details.',
      },
    });
  }
};

bookController.submitNewRatingAndNotes = async (req, res, next) => {
  const { bookId, username, newRating, newNotes } = req.body;
  try {
    const response = await db.query(queries.submitNewRatingAndNotes, [bookId, username, newRating, newNotes]);
    res.locals.book = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `bookController.submitNewRatingAndNotes: ERROR: ${error}`,
      message: {
        err: 'bookController.submitNewRatingAndNotes: ERROR: Check server logs for details.',
      },
    });
  }
};

bookController.deleteReadBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  try {
    // console.log("in bookController.deleteReadBook, bookId is :", bookId);
    // delete book ratings first before deleting read book (foreign key constraint)
    await db.query(queries.deleteBookRating, [bookId]);
    const response = await db.query(queries.deleteReadBook, [bookId]);
    res.locals.book = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `bookController.deleteReadBook: ERROR: ${error}`,
      message: {
        err: 'bookController.deleteReadBook: ERROR: Check server logs for details.',
      },
    });
  }
};

module.exports = bookController;
