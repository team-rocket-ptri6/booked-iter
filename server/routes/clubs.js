const express = require('express');
const clubController = require('../controllers/clubController');
<<<<<<< HEAD
<<<<<<< HEAD
const jwtController = require('../controllers/jwtController');
const memberController = require('../controllers/memberController');
const userController = require('../controllers/userController');
=======
>>>>>>> b564966 (.env need to fix)
=======
const jwtController = require('../controllers/jwtController');
const memberController = require('../controllers/memberController');
const userController = require('../controllers/userController');
>>>>>>> 19413a3 (Add member middleware)

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(res.locals);
});

<<<<<<< HEAD
<<<<<<< HEAD
router.post('/new', jwtController.verifyToken, clubController.createClub, memberController.addMember, memberController.setAdmin, (req,res) => {
=======
router.post('/new', jwtController.verifyToken, clubController.createClub, memberController.addMember, (req,res) => {
>>>>>>> 19413a3 (Add member middleware)
=======
router.post('/new', jwtController.verifyToken, clubController.createClub, memberController.addMember, memberController.setAdmin, (req,res) => {
>>>>>>> 033cbfd (Sets admin as the member who created the club upon club creation)
  res.status(200).json(res.locals);
});

//add members
router.post('/add', jwtController.verifyToken, memberController.verifyAdmin, userController.findOneByEmail, memberController.addMember, (req, res) => {
  res.status(200).json(res.locals);
});

//delete members
router.post('/remove', jwtController.verifyToken, memberController.verifyAdmin, memberController.removeMember, (req, res) => {
  res.status(200).json(res.locals);
});

/* /:id routes */
router.get('/:id',(req, res) => {
  res.status(200).json(res.locals);
});

router.put('/:id', (req, res) => {
  res.status(200).json(res.locals);
});

router.delete('/:id', (req, res) => {
  res.status(200).json(res.locals);
});

/* methods related to books and groups */
router.get('/:bookId', (req, res) => {
  res.status(200).json(res.locals);
});

router.post('/:bookId', (req, res) => {
  res.status(200).json(res.locals);
});

router.put('/:bookId', (req, res) => {
  res.status(200).json(res.locals);
});

router.delete('/:bookId', (req, res) => {
  res.status(200).json(res.locals);
});

module.exports = router;
