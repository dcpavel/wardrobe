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

    it('writes to the clothing table', async () => {
      const res = await pClothing.createClothing(createClothing);

      expect(res).not.toBeInstanceOf(Error);
      expect(res).toHaveProperty('_id');

      clothingId = res._id;
    });

    it('gets one clothing row by id', async () => {
      const clothing = await pClothing.getById(clothingId);

      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing).toHaveProperty('_id');
    });

    xit('gets one clothing row by noSqlKey', async () => {
      const clothing = await pClothing.getByNoSqlKey(createClothing.noSqlKey);

      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing).toHaveProperty('nosqlkey');
      expect(clothing.noqslkey).toEqual(createClothing.noSqlKey);
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

      expect(clothing).toHaveProperty('lastmodified');
      expect(clothing.createdon).not.toEqual(clothing.lastmodified);
    });

    it('we can delete the clothing by id', async () => {
      const createdClothing = await pClothing.getById(clothingId);
      const res = await pClothing.deleteById(clothingId);

      expect(res).not.toBeInstanceOf(Error);
      expect(res).toEqual(createdClothing);
    });
  });
});

describe('MongoDB clothing collection unit tests', () => {
  afterAll(async () => {
    await mDb.close();
  });

  describe('We can connect to the database', () => {
    it('connects to the database', () => {
      expect(mDb).not.toBeInstanceOf(Error);
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
      const res = await mClothing.createClothing(createClothing);

      expect(res).not.toBeInstanceOf(Error);
      expect(res).toHaveProperty('_id');

      id = res._id;
    });

    xit('gets one clothing record by id', async () => {
      const clothing = await mClothing.getById(clothingId);

      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing).toHaveProperty('_id');
    });

    xit('we can update the name', async () => {
      const newName = 'newName';
      const changedClothing = Object.assign({}, createClothing, { name: newName });
      const clothing = await mClothing.update(changedClothing);

      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing.name).toEqual(newName);
    });

    xit('we can update a link', async () => {
      const newLink = 'http://www.foo.bar/';
      const changedClothing = Object.assign({}, createClothing, { link: newLink });
      const clothing = await mClothing.update(changedClothing);

      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing.link).toEqual(newLink);
    });

    xit('we can update colors', async () => {
      const newColors = [ 'newColor' ];
      const changedClothing = Object.assign({}, createClothing, { colors: newColors });
      const clothing = await mClothing.update(changedClothing);

      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing.colors).toEqual(newColors);
    });

    xit('we can update patters', async () => {
      const newPattern = [ 'newPattern' ];
      const changedClothing = Object.assign({}, createClothing, { pattern: newPattern });
      const clothing = await mClothing.update(changedClothing);

      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing.pattern).toEqual(newPattern);
    });

    xit('we can update fabrics', async () => {
      const newFabrics = [ 'newFabric' ];
      const changedClothing = Object.assign({}, createClothing, { colors: newFabrics });
      const clothing = await mClothing.update(changedClothing);

      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing.fabrics).toEqual(newFabrics);
    });

    xit('we cannot create clothing without a name', async () => {
      const changedClothing = Object.assign({}, createClothing, { name: '' });
      const clothing = await mClothing.create(changedClothing);

      expect(clothing).toBeInstanceOf(Error);
    });

    xit('we can delete the record by id', async () => {
      const createdClothing = await mClothing.getById(id);
      const res = await mClothing.deleteById(id);

      expect(res).not.toBeInstanceOf(Error);
      expect(res).toEqual(createdClothing);
    });

    xit('the noSqlKey in matching Postgres database is cleared', async () => {
      const clothingRow = await pClothing.getByNoSqlId(id);

      expect(clothingRow).not.toBeInstanceOf(Error);
      expect(clothingRow).toHaveProperty('nosqlkey');
      expect(clothingRow.nosqlkey).toEqual('');
    });
  });
});