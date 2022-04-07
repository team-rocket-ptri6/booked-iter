const db = require('../models/database');
const queries = require('../models/queries');

const questionController = {};

questionController.addQuestion = async (req, res, next) => {
  const { question, member_id } = req.body;
  try {
    const response = await db.query(queries.addQuestion, [question, member_id]);
    res.locals.question = response.rows;

    return next();    
  } catch (error) {
    return next({
      log: `questionController.addQuestion: ERROR: ${error}`,
      message: { err: 'questionController.addQuestion: ERROR: Check server logs for details.' }
    });
  }

};

module.exports = questionController;