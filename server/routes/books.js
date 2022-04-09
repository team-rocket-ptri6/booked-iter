const express = require('express');
const jwtController = require('../controllers/jwtController');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.post('/', jwtController.verifyToken, bookController.saveBook, (req, res) => {
  return res.status(200).json(res.locals);
});

module.exports = router;
