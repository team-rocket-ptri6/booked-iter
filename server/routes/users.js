const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(res.locals);
});

router.post('/signup',userController.createUser , (req, res) => {
  res.status(200).json(res.locals);
});

//toDo: error handling for wrong username/password combo
router.post('/login',(req, res, next) => {
  const {username, password} = req.body;
  db.query(queries.loginUser, [username, password])
    .then(response => res.locals = response.rows)
    .then(() => next())
    .catch(err => next({
      log: err,
    }));
} , (req, res) => {
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
