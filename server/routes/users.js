const express = require('express');
const userController = require('../controllers/userController');
<<<<<<< HEAD
=======
const jwtController = require('../controllers/jwtController');
>>>>>>> dev
const router = express.Router();

router.get('/',(req, res) => {
  res.status(200).json(res.locals);
});

<<<<<<< HEAD
router.post('/signup', userController.createUser , (req, res) => {
=======
router.post('/signup', userController.createUser, jwtController.generateToken, (req, res) => {
>>>>>>> dev
  res.status(200).json(res.locals);
});

//toDo: error handling for wrong username/password combo
<<<<<<< HEAD
router.post('/login', userController.loginUser, (req, res) => {
=======
router.post('/login', userController.loginUser, jwtController.generateToken,(req, res) => {
>>>>>>> dev
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
