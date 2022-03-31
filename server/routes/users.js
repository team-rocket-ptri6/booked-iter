const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(res.locals);
});

router.post('/signup', (req, res) => {
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
