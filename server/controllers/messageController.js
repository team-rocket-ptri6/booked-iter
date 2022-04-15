const queries = require('../models/queries');
const db = require('../models/database');

const messageController = {};

messageController.get100ClubMessages = async (req, res, next) => {};

messageController.addNewClubMessage = async (req, res, next) => {
  const { userId } = req.user;
  const { clubId, message } = req.body;

  if (
    typeof userId !== 'number' ||
    typeof clubId !== 'number' ||
    typeof message !== 'string'
  ) {
    return res.status(400).send('request data is incorrect');
  }
  try {
    result = await db.query(queries.addNewMessage, [userId, clubId, message]);

    res.locals.newMessage = result.rows[0];
    return next();
  } catch (error) {
    return next({
      log: `messageController.addNewClubMessage: ERROR: ${error}`,
      message: {
        err: 'messageController.addNewClubMessage: ERROR: Check server logs for details.',
      },
    });
  }
};

messageController.deleteMessage = async (req, res, next) => {};

messageController.updateMessage = async (req, res, next) => {};

module.exports = messageController;
