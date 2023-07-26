const { pClothing, mClothing, pDb, mDb } = require('../../server/models/clothingModel');
const { wardrobes } = require('../../server/models/wardrobeModel');
const { clothingTypes } = require('../../server/models/clothingTypeModel');
const { users } = require('../../server/models/userModel');

describe('Postgres clothing table unit tests', () => {
  afterAll(() => {
    pDb.end();
  });

  describe('We can connect to the database', () => {
    it('connects to the database', () => {
      expect(pDb).not.toBeInstanceOf(Error);
      expect(pDb).toHaveProperty('query');
    });
  });

  describe('We can use the clothing table', () => {
    // we set this in the first test
    let clothingId;

    // we set these in the beforeAll
    let createClothing;

    beforeAll(async () => {
      const createType = {
        name: 'test',
        bodyPosition: 'torso'
      };
      const type = await clothingTypes.createType(createType);

      const createUser = {
        firstname: 'first',
        lastname: 'last',
        username: 'username',
        password: 'password',
        email: 'test@email.com'
      };
      const user = await users.createUser(createUser);
      
      const createWardrobe = {
        userId: user._id,
        name: 'testWardrobe'
      };
      const wardrobe = await wardrobes.createWardrobe(createWardrobe);

      createClothing = {
        wardrobeId: wardrobe._id,
        typeId: type._id,
        noSqlKey: 'testKey',        
      };

      return;
    });

    xit('writes to the clothing table', async () => {

    });

    xit('gets one clothing row by id', async () => {

    });

    xit('gets all articles of clothing', async () => {

    });

    xit('gets all articles of clothing by wardrobeId', async () => {

    });

    xit('we can update the typeId', async () => {

    });

    xit('we cannot update the wardrobeId', async () => {

    });

    xit('we cannot modify the noSqlKey', async () => {

    });

    xit('the lastModifiedOn column updates', async () => {

    });

    xit('we can delete the clothing by id', async () => {

    });
  });
});

describe('MongoDB clothing collection unit tests', () => {
  afterAll(() => {

  });

  describe('We can connect to the database', () => {
    it('connects to the database', () => {
      expect(mDb).not.toBeInstanceOf(Error);
      expect(mDb).toHaveProperty('query');
    });
  });
});