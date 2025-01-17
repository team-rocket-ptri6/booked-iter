const express = require('express');
const clubController = require('../controllers/clubController');
const jwtController = require('../controllers/jwtController');
const memberController = require('../controllers/memberController');
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController')

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(res.locals);
});



router.post('/new', jwtController.verifyToken, clubController.createClub, memberController.addMember, memberController.setAdmin, (req, res) => {
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

//delete club (only for admin)
router.delete('/deleteClub', jwtController.verifyToken, memberController.verifyAdmin, clubController.deleteClub, (req, res) => {
  res.status(200).json(res.locals);
});

//make a member admin (only for admin)
router.patch('/makeAdmin', jwtController.verifyToken, memberController.makeAdmin, (req, res) => {
  res.status(200).json(res.locals);
});

//remove admin privilege from a member (only for admin)
router.patch('/removeAdmin', jwtController.verifyToken, memberController.removeAdmin, (req, res) => {
  res.status(200).json(res.locals);
});

/* /:id routes */
router.get('/:id', jwtController.verifyToken, clubController.getClub, memberController.getAllClubMembers, messageController.get100ClubMessages, (req, res) => {
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

//for changing club description
router.patch('/description', clubController.changeClubDescription, (req, res) => {
  res.status(200).json(res.locals);
});

module.exports = router;
