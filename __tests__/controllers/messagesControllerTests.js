const messageController = require('../../server/controllers/messageController');
const db = require('../../server/models/database');
const queries = require('../../server/models/queries');

jest.mock('../../server/models/database');

describe('Unit tests for messageController',  () => {
  let req = {};
  let res = {};
  let next;
  
  describe('.addNewClubMessage', () => {
    beforeEach(() => {
      next = jest.fn();
      req.user = {userName: 'janedoe', userId: 1};
      req.body = {member_id: 2, message: 'this is a test message'};
      res.locals = {};
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('adds a new message to the database', async ()=> {
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
      expect(res.locals.newMessage).toEqual(mockMessageResponce);
      expect(db.query).toBeCalledWith(queries.addNewMessage, [req.body.member_id, req.body.message, false]);
      expect(next).toBeCalledTimes(1);
      
    })

    it('should invoke global error handler db connection fails', async () => {
      //mock the response to invoking db.query
      const error = new Error('this is an error message')
      db.query.mockResolvedValueOnce(error);

      next = function(nextInvocation) {
        expect(nextInvocation).toBeInstanceOf(Object);
      }

      //invoke the functino being tested
      await messageController.addNewClubMessage(req, res, next);

      // assertions
      expect(res.locals.newMessage).toEqual(undefined);
      expect(db.query).toBeCalledWith(queries.addNewMessage, [req.body.member_id, req.body.message, false]);
    })

    it('should respond with status 400 if reqest information is bad', async ()=> {
      req.body.member_id = 'not the right value';
      res = {
        ...res,
        status: function(responseStatus) {
          expect(responseStatus).toEqual(400);
          // This next line makes it chainable
          return this; 
        },
        send: jest.fn(),
      }
    
      //invoke the functino being tested
      await messageController.addNewClubMessage(req, res, next);

      // assertions
      expect(res.send).toHaveBeenCalled();
      expect(res.locals.newMessage).toEqual(undefined);
      expect(db.query).not.toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    })
  })

  describe('.get100ClubMessages', () => {
    beforeEach(() => {
      next = jest.fn();
      req.params = {clubId: 1};
      res.locals = {};
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('adds messages from database to res.locals', async() => {
      const mockResponce = [{
        message_id: 1,
        message: 'this is a message',
        user_id: 2,
        username: 'janedoe',
        edited: false,
      }];
      
      db.query.mockResolvedValueOnce({ 
        rows: mockResponce, 
        rowCount: 1 
      });

      //invoke the functino being tested
      await messageController.get100ClubMessages(req, res, next);

      // assertions
      expect(res.locals.messages).toEqual(mockResponce);
      expect(db.query).toBeCalledWith(queries.getClubMessages, [req.params.clubId]);
      expect(next).toBeCalledTimes(1);
    })

    it('should invoke global error handler if db connection fails', async () => {
      const error = new Error('this is an error message')
      db.query.mockResolvedValueOnce(error);

      next = function(nextInvocation) {
        expect(nextInvocation).toBeInstanceOf(Object);
      }

      //invoke the functino being tested
      await messageController.get100ClubMessages(req, res, next);

      // assertions
      expect(res.locals.newMessage).toEqual(undefined);
      expect(db.query).toBeCalledWith(queries.getClubMessages, [req.params.clubId]);
    })

  })
})  