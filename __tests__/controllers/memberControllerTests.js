const clubController = require('../../server/controllers/memberController');
const db = require('../../server/models/database');
const queries = require('../../server/models/queries');

jest.mock('../../server/models/database');

describe('Unit tests for the memberController', () => {
  const req = {};
  const res = {};
  let next;

  describe('.getClub', () => {
      beforeEach(() => {
          next = jest.fn();
          req.params = { id: 2, what: 2 };
          res.locals = {};
      });
      afterEach(() => {
          jest.clearAllMocks();
      });

      it('retrieves the club information given the id as param', async () => {
          //mock the response to invoking db.query
          const mockMessageResponce = {
              club_id: 2,
              club_name: 'club name',
              description: 'test description',
          }
          db.query.mockResolvedValueOnce({
              rows: [mockMessageResponce],
              rowCount: 1
          });

          //invoke the functino being tested
          await clubController.getClub(req, res, next);

          // assertions
          expect(res.locals).toEqual(mockMessageResponce);
          expect(db.query).toBeCalledWith(queries.getClub, [req.params.id]);
          expect(next).toBeCalledTimes(1);

      });
  });
});