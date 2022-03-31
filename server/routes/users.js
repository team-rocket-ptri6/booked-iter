const express = require('express');
const db = require('../models/database');
const queries = require('../models/queries');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(res.locals);
});

router.post('/signup', (req, res, next) => {
  // db.query(queries.createUser, ['Jonathan', 'Haviv', 'jonathandhaviv@gmail.com', 'jonh', 'password'])
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
