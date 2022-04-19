const queries = require('../models/queries');
const db = require('../models/database');

const messageController = {};

messageController.get100ClubMessages = async (req, res, next) => {
  const { clubId } = req.params;
  try {
    result = await db.query(queries.getClubMessages, [clubId]);

    res.locals.messages = result.rows;
    return next();
  } catch (error) {
    return next({
      log: `messageController.get100ClubMessages: ERROR: ${error}`,
      message: {
        err: 'messageController.get100CLubMessages: ERROR: Check server logs for details.',
      },
    });
  }
};

messageController.addNewClubMessage = async (req, res, next) => {
  const { member_id, message } = req.body;

  if (
    typeof member_id !== 'number' ||
    typeof message !== 'string'
  ) {
    return res.status(400).send('request data is incorrect');
  }
  try {
    result = await db.query(queries.addNewMessage, [member_id, message, false]);

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
