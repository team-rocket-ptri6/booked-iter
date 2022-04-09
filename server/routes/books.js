const express = require('express');
const jwtController = require('../controllers/jwtController');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.post('/', jwtController.verifyToken, bookController.saveBook, (req, res) => {
  return res.status(200).json(res.locals);
});

router.post('/update/:bookId', bookController.setCurrentlyReading, (req, res) => {
  return res.status(200).json(res.locals);
});

router.post('/vote/:bookId', (req, res) => {
  return res.status(200).json(res.locals);
});

router.get('/:clubId', jwtController.verifyToken, bookController.getBooksByClub, bookController.getGoogleBooks, (req, res) => {
  return res.status(200).json(res.locals);
});


module.exports = router;
