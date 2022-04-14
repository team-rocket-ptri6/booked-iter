const express = require('express');
const messageController = require('../controllers/messageController');
const jwtController = require('../controllers/jwtController');

const router = express.Router();

/** 
 * Delete a message from the database from
 * Idetify message with messageId
*/
router.delete('/:messageId',jwtController.verifyToken, messageController.deleteMessage, (req, res) => {
  res.status(200).json(res.locals);
});

/**
 * Add a new message to a club chat for a specific club id
 * Idetify club with clubId
 * Data for the message should be in message property on the body of the request (sets edited flag to false as default)
 */
router.post('/new',jwtController.verifyToken, messageController.addNewClubMessage, (req, res) => {
  res.status(200).json(res.locals);
});


/** 
 * Get the most recent 100 messages from the database for a specific club id
 * Idetify club with clubId
 */
router.get('/:clubId', jwtController.verifyToken, messageController.get100ClubMessages, (req, res) => {
  res.status(200).json(res.locals);
});

/** 
 * Update a particular message in the database. (sets edited flag to true)
 * Idetify message with messageId
 * Data for the upadte should be in message property on the body of the request 
*/
router.put('/:messageId', jwtController.verifyToken, messageController.updateMessage, (req, res) => {
  res.status(200).json(res.locals);
});

module.exports = router;