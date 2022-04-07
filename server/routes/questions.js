const express = require('express');
const questionController = require('../controllers/questionController');
const jwtController = require('../controllers/jwtController');
const memberController = require('../controllers/memberController');
const router = express.Router();


router.post('/new',jwtController.verifyToken, questionController.addQuestion, (req, res) => {
  res.status(200).json(res.locals);
});

module.exports = router;