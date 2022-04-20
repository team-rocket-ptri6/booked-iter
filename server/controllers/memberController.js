const db = require('../models/database');
const queries = require('../models/queries');

const memberController = {};

memberController.verifyAdmin = async (req, res, next) => {
  const userId = req.user;
  const { clubId } = req.body;

  try {
    const memberResponse = await db.query(queries.findMember, [userId, clubId]);
    if (memberResponse.rows.length < 1 || !memberResponse.rows[0].admin) {
      throw {
        log: `Member with ID: ${userId} could not be found in club with ID: ${clubId} or the member is not an admin this club.`,
        status: 404,
        message: `Member with ID: ${userId} could not be found in club with ID: ${clubId} or the member is not an admin of this club.`,
      };
    };

    res.locals.club_id = memberResponse.rows[0].club_id;

    return next();

  } catch (error) {
    return next({
      log: `memberController.verifyAdmin: ERROR: ${error.log}`,
      message: { err: `${error.message ? error.message : 'memberController.verifyAdmin: ERROR: Check server logs for details.'}` },
      status: error.status ? error.status : 500,
    });
  }
};

memberController.addMember = async (req, res, next) => {
  const { club_id, user_id } = res.locals;
  try {
    const response = await db.query(queries.addMember, [user_id, club_id]);
    res.locals.member = response.rows[0];
    return next();
  } catch (error) {
    return next({
      log: `memberController.addMember: ERROR: ${error}`,
      message: { err: 'memberController.addMember: ERROR: Check server logs for details.' }
    });
  }
};

memberController.setAdmin = async (req, res, next) => {
  const { member_id } = res.locals.member;
  try {
    const response = await db.query(queries.setAdmin, [member_id]);
    res.locals.member = response.rows[0];

    return next();
  } catch (error) {
    return next({
      log: `memberController.setAdmin: ERROR: ${error}`,
      message: { err: 'memberController.setAdmin: ERROR: Check server logs for details.' }
    });
  }
};

memberController.makeAdmin = async (req, res, next) => {
  const { member_id } = req.body;
  try {
    const response = await db.query(queries.setAdmin, [member_id]);
    res.locals.member = response.rows[0];

    return next();
  } catch (error) {
    return next({
      log: `memberController.makeAdmin: ERROR: ${error}`,
      message: { err: 'memberController.makeAdmin: ERROR: Check server logs for details.' }
    });
  }
};

memberController.removeAdmin = async (req, res, next) => {
  const { member_id } = req.body;
  try {
    const response = await db.query(queries.removeAdmin, [member_id]);
    res.locals.member = response.rows[0];

    return next();
  } catch (error) {
    return next({
      log: `memberController.removeAdmin: ERROR: ${error}`,
      message: { err: 'memberController.removeAdmin: ERROR: Check server logs for details.' }
    });
  }
};




memberController.removeMember = async (req, res, next) => {
  const { member_id } = req.body;
  try {
    const response = await db.query(queries.deleteMember, [member_id]);
    res.locals.member = response.rows[0];

    return next();

  } catch (error) {
    return next({
      log: `memberController.removeMember: ERROR: ${error}`,
      message: { err: 'memberController.removeMember: ERROR: Check server logs for details.' }
    });
  }
};

memberController.getAllClubMembers = async (req, res, next) => {
  const clubId = req.params.id;
  try {
    const response = await db.query(queries.getClubMembers, [clubId]);
    res.locals.members = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `memberController.removeMember: ERROR: ${error}`,
      message: { err: 'memberController.removeMember: ERROR: Check server logs for details.' },
    });
  }
};

// This process feels repetitive and can be bundled into the get all members function but not sure if there is enough case for them to be separate.
// memberController.verifyMembership = async (req, res, next) => {
//   const clubId = req.params.id;
//   const userId = req.user;
//   try {
//     const response = await await db.query(queries.findMember, [userId, clubId]);
//     res.locals.members = response.rows; const userId = req.user;

//     return next();
//   } catch (error) {
//     return next({
//       log: `memberController.removeMember: ERROR: ${error}`,
//       message: { err: 'memberController.removeMember: ERROR: Check server logs for details.' },
//     });
//   }
// };


module.exports = memberController;
