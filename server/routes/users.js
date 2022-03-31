const express = require('express');
const db = require('../models/database');
const queries = require('../models/queries');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(res.locals);
});

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  db.query(queries.createUser, [firstName, lastName, email, username, password])
    .then(response => res.locals = response.rows)
    .then(() => next())
    .catch(err => next({
      log: err,
    }));
  // db.query(queries.createUser, ['Nidhi', 'Reddy', 'nidhi@gmail.com', 'nidhik', 'pass'])
  //   .then(response => res.locals = response.rows)
  //   .then(() => next())
  //   .catch(err => next({
  //     log: err,
  //   }));
} , (req, res) => {
  res.status(200).json(res.locals);
});

router.post('/login', (req, res) => {
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
