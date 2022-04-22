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

router.post('/updateRead/:bookId', bookController.markAsRead, (req, res) => {
  return res.status(200).json(res.locals);
});

router.post('/vote/:bookId/:memberId', bookController.vote, (req, res) => {
  return res.status(200).json(res.locals);
});

// this get endpoint has to be placed before the more generic get below
router.get('/rating/:clubId&:username', jwtController.verifyToken, bookController.getBooksByClubAndRating, bookController.getGoogleBooks, (req, res) => {
  return res.status(200).json(res.locals);
});

router.get('/read/:clubId', jwtController.verifyToken, bookController.getBooksByClub, bookController.getGoogleBooks, (req, res) => {
  return res.status(200).json(res.locals);
});

router.patch('/rating', bookController.submitNewRatingAndNotes, (req, res) => {
  return res.status(200).json(res.locals);
});

router.delete('/delete/:bookId', bookController.deleteReadBook, (req, res) => {
  return res.status(200).json(res.locals);
});


module.exports = router;
