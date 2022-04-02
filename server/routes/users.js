const express = require('express');
const userController = require('../controllers/userController');
const jwtController = require('../controllers/jwtController');
const router = express.Router();

router.get('/',(req, res) => {
  res.status(200).json(res.locals);
});

router.post('/signup', userController.createUser, jwtController.generateToken, (req, res) => {
  res.status(200).json(res.locals);
});

//toDo: error handling for wrong username/password combo
router.post('/login', userController.loginUser, jwtController.generateToken,(req, res) => {
  res.status(200).json(res.locals);
});

/* /:id routes */
router.get('/:id', (req, res) => {
  res.status(200).json(res.locals);
});

router.put('/:id', (req, res) => {
  res.status(200).json(res.locals);
});

router.delete('/:id', (req, res) => {
  res.status(200).json(res.locals);
});

module.exports = router;
