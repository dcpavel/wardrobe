const { pClothing, mClothing, pDb, mDb } = require('../../server/models/clothingModel');


describe('Postgres clothing table unit tests', () => {
  afterAll(() => {
    pDb.end();
  });
});

describe('MongoDB clothing collection unit tests', () => {
  afterAll(() => {

  });
});