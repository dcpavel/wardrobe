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
    let userId;

    // defined outside to use in tests
    const createType = {
      name: 'test',
      bodyPosition: 'torso'
    };
    const createUser = {
      firstname: 'first',
      lastname: 'last',
      username: 'username',
      password: 'password',
      email: 'test@email.com'
    };
    const createWardrobe = {
      userId,
      name: 'testWardrobe'
    };

    beforeAll(async () => {
      const type = await clothingTypes.createType(createType);
      
      const user = await users.createUser(createUser);
      userId = user._id;
      
      createWardrobe.userId = userId;
      const wardrobe = await wardrobes.createWardrobe(createWardrobe);

      createClothing = {
        wardrobeId: wardrobe._id,
        typeId: type._id,
        noSqlKey: 'testKey',        
      };

      return;
    });

    afterAll(async () => {      
      await users.deleteById(userId);      
      await wardrobes.deleteById(createClothing.wardrobeId);
      await clothingTypes.deleteById(createClothing.typeId);

      return;
    });

    xit('writes to the clothing table', async () => {
      const res = await pClothing.createClothing(createClothing);
      expect(res).not.toBeInstanceOf(Error);
      expect(res).toHaveProperty('_id');

      clothingId = res._id;
    });

    xit('gets one clothing row by id', async () => {
      const clothing = await pClothing.getById(clothingId);
      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing).toHaveProperty('_id');
    });

    xit('gets all articles of clothing', async () => {
      const allClothes = await pClothing.getAll();
      expect(allClothes).not.toBeInstanceOf(Error);
      expect(allClothes.length).toBeGreaterThan(0);
    });

    xit('gets all articles of clothing by wardrobeId', async () => {
      // set up for test
      const changedWardrobe = Object.assign({}, createWardrobe, { name: 'newWardrobe' });
      const newWardrobe = await wardrobes.createWardrobe(changedWardrobe);      
      const changedClothing = Object.assign({}, createClothing, { wardrobeId: newWardrobe._id });
      const newClothing = await pClothing.createClothing(changedClothing);

      // here is what we will test
      const clothing = await pClothing.getByWardrobeId(createClothing.wardrobeId);      

      // do this before the test as cleanup in case of error
      await wardrobes.deleteById(newWardrobe._id);
      await pClothing.deleteById(newClothing._id);

      // the results
      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing.length).toEqual(1);
    });

    xit('we can update the typeId', async () => {
      // set up for test
      const changedType = Object.assign({}, createType, { name: 'newType' });
      const newType = await clothingTypes.createType(changedType);
      const changedClothing = Object.assign({}, createClothing, { typeId: newType._id });

      // here is what we will test
      const clothing = await pClothing.updateClothing(clothingId, changedClothing);

      // do this before the test as cleanup in case of error
      await clothingTypes.deleteById(newType._id);

      // the results
      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing._id).toEqual(clothingId);
    });

    xit('we cannot update the wardrobeId', async () => {
      // set up for test
      const changedWardrobe = Object.assign({}, createWardrobe, { name: 'newWardrobe' });
      const newWardrobe = await wardrobes.createWardrobe(changedWardrobe);      
      const changedClothing = Object.assign({}, createClothing, { wardrobeId: newWardrobe._id });

      // here is what we will test
      const clothing = await pClothing.updateClothing(clothingId, changedClothing);

      // do this before the test as cleanup in case of error
      await wardrobes.deleteById(newWardrobe._id);

      // the results
      expect(clothing).toBeInstanceOf(Error);
    });

    xit('we cannot modify the noSqlKey', async () => {
      const changedClothing = Object.assign({}, createClothing, { noSqlKey: 'something' });

      const clothing = await pClothing.updateClothing(clothingId, changedClothing);
      expect(clothing).toBeInstanceOf(Error);
    });

    xit('the lastModifiedOn column updates', async () => {
      const clothing = await pClothing.getById(clothingId);
      console.log(clothing);

      expect(clothing).toHaveProperty(/lastmodified/i);
      expect(clothing.createdOn).not.toEqual(clothing.lastModified);
    });

    xit('we can delete the clothing by id', async () => {
      const createdClothing = await pClothing.getById(clothingId);
      const res = await pClothing.deleteById(clothingId);
      expect(res).not.toBeInstanceOf(Error);
      expect(res).toEqual(createdClothing);
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

  describe('We can use the clothing collection', () => {
    // we set this in the first test
    let id;

    const createClothing = {
      name: 'test',
      link: 'http://www.test.com',
      colors: [ 'red', 'blue', 'green' ],
      patters: [ 'plaid', 'striped' ],
      fabrics: [ 'wool', 'cotton' ]
    };

    xit('creates a clothing record', async () => {

    });

    xit('gets one clothing record by id', async () => {

    });

    xit('we can update the name', async () => {

    });

    xit('we can update a link', async () => {

    });

    xit('we can update colors', async () => {

    });

    xit('we can update patters', async () => {

    });

    xit('we can update fabrics', async () => {

    });

    xit('we cannot create clothing without a name', async () => {

    });

    xit('we can delete the record by id', async () => {

    });

    xit('the noSqlKey in matching Postgres database is cleared', async () => {

    });
  });
});