const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(res.locals);
});

router.post('/new', (req,res) => {
  res.status(200).json(res.locals);
});

router.post('/add', (req, res) => {
  res.status(200).json(res.locals);
});

router.post('/delete', (req, res) => {
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
