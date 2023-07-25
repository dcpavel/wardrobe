const pool = require('../../server/models/userModel');

describe('Postgres unit tests', () => {
  describe('We can connect to the database', () => {
    it('connects to the database', () => {
      console.log(pool);
      // expect(pool)
    });
  });
});