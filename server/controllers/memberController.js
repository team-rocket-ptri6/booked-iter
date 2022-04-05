const db = require('../models/database');
const queries = require('../models/queries');

const memberController = {};

memberController.verifyAdmin = async (req, res, next) => {
  const userId = req.user;
  const { clubId } = req.body;

  try {
    const memberResponse = await db.query(querie)
  } catch (error) {
    
  }
}

module.exports = memberController;