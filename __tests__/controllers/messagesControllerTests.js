const messageController = require('../../server/controllers/messageController');
const db = require('../../server/models/database')

jest.mock('../../server/models/database');
console.log('mock db query?', db);


describe('Unit tests for the messageController',  () => {
  let req;
  let res;
  let next;
  describe('.addNewClubMessage', () => {
    beforeEach(() => {
      next = jest.fn();
      req = {};
      res = {};
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('adds a new message to the database', async ()=> {
      //mock the request and response object
      req.user = {
          userName: 'janedoe',
          userId: 1,
        };
      req.body = {
        clubId: 2,
        message: 'this is a test message',
      }
      res.locals = {
      }

      //mock the response to invoking db.query
      const mockMessageResponce = {
        message: req.body.message,
        message_id: 12,
        member_id: 14,
        edited: false,
      }
      db.query.mockResolvedValueOnce({ 
        rows: [mockMessageResponce], 
        rowCount: 1 
      });


      //invoke the functino being tested
      await messageController.addNewClubMessage(req, res, next);

      // assertions
      expect(res.locals.message).toEqual(mockMessageResponce);
      // expect(db.query).toBeCalledWith('QUERY STRING');
      expect(next).toBeCalledTimes(1);
      
      



    })
  })
})