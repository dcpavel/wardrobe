const { clothes, db } = require('../../server/models/sqlClothingModel');
const { wardrobes } = require('../../server/models/wardrobeModel');
const { clothingTypes } = require('../../server/models/clothingTypeModel');
const { users } = require('../../server/models/userModel');

describe('Postgres clothing table unit tests', () => {
  afterAll(async () => {
    await db.end();
  });

  describe('We can connect to the database', () => {
    it('connects to the database', () => {
      expect(db).not.toBeInstanceOf(Error);
      expect(db).toHaveProperty('query');
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
      const resUsers = await users.deleteById(userId);      
      const resWardrobes = await wardrobes.deleteById(createClothing.wardrobeId);
      const resTypes = await clothingTypes.deleteById(createClothing.typeId);

      return;
    });

    it('writes to the clothing table', async () => {
      const res = await clothes.createClothing(createClothing);

      expect(res).not.toBeInstanceOf(Error);
      expect(res).toHaveProperty('_id');

      clothingId = res._id;
    });

    it('gets one clothing row by id', async () => {
      const clothing = await clothes.getById(clothingId);

      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing).toHaveProperty('_id');
    });

    xit('gets one clothing row by noSqlKey', async () => {
      const clothing = await clothes.getByNoSqlKey(createClothing.noSqlKey);

      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing).toHaveProperty('nosqlkey');
      expect(clothing.noqslkey).toEqual(createClothing.noSqlKey);
    });

    xit('gets all articles of clothing', async () => {
      const allClothes = await clothes.getAll();

      expect(allClothes).not.toBeInstanceOf(Error);
      expect(allClothes.length).toBeGreaterThan(0);
    });

    xit('gets all articles of clothing by wardrobeId', async () => {
      // set up for test
      const changedWardrobe = Object.assign({}, createWardrobe, { name: 'newWardrobe' });
      const newWardrobe = await wardrobes.createWardrobe(changedWardrobe);      
      const changedClothing = Object.assign({}, createClothing, { wardrobeId: newWardrobe._id });
      const newClothing = await clothes.createClothing(changedClothing);

      // here is what we will test
      const clothing = await clothes.getByWardrobeId(createClothing.wardrobeId);      

      // do this before the test as cleanup in case of error
      await wardrobes.deleteById(newWardrobe._id);
      await clothing.deleteById(newClothing._id);

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
      const clothing = await clothes.updateClothing(clothingId, changedClothing);

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
      const clothing = await clothes.updateClothing(clothingId, changedClothing);

      // do this before the test as cleanup in case of error
      await wardrobes.deleteById(newWardrobe._id);

      // the results
      expect(clothing).toBeInstanceOf(Error);
    });

    xit('we cannot modify the noSqlKey', async () => {
      const changedClothing = Object.assign({}, createClothing, { noSqlKey: 'something' });
      const clothing = await clothes.updateClothing(clothingId, changedClothing);

      expect(clothing).toBeInstanceOf(Error);
    });

    xit('the lastModifiedOn column updates', async () => {
      const clothing = await clothes.getById(clothingId);

      expect(clothing).toHaveProperty('lastmodified');
      expect(clothing.createdon).not.toEqual(clothing.lastmodified);
    });

    it('we can delete the clothing by id', async () => {
      const createdClothing = await clothes.getById(clothingId);
      const res = await clothes.deleteById(clothingId);

      expect(res).not.toBeInstanceOf(Error);
      expect(res).toEqual(createdClothing);
    });
  });
});
