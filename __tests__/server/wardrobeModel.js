const { wardrobes, db } = require('../../server/models/wardrobeModel');
const { users } = require('../../server/models/userModel');

describe('Postgres wardrobes table unit tests', () => {
  afterAll(async () => {
    await db.end();
  });

  describe('We can connect to the database', () => {
    it('connects to the database', () => {
      expect(db).not.toBeInstanceOf(Error);
      expect(db).toHaveProperty('query');
    });
  });

  describe('we can access the wardrobes table', () => {
    // this gets set in the beforeAll
    let userId;
    let createWardrobe;

    // this gets set in the firstTest
    let wardrobeId;

    beforeAll(async () => {
      const createUser = {
        firstname: 'first',
        lastname: 'last',
        username: 'username',
        password: 'password',
        email: 'test@email.com'
      };
      const user = await users.createUser(createUser);
      
      userId = user._id;
      createWardrobe = {
        userId: user._id,
        name: 'testWardrobe'
      };
    });

    afterAll(async () => {
      await users.deleteById(userId);
    });
    
    it('writes to wardrobes', async () => {   
      const res = await wardrobes.createWardrobe(createWardrobe);
      expect(res).not.toBeInstanceOf(Error);
      expect(res).toHaveProperty('_id');

      wardrobeId = res._id;
    });    

    it('reads from wardrobes', async () => {
      const allWardrobes = await wardrobes.getAll();
      expect(allWardrobes).toBeInstanceOf(Array);
      expect(allWardrobes.length).toBeGreaterThan(0);
    });

    it('gets a wardrobe by id', async () => {
      const wardrobe = await wardrobes.getById(wardrobeId);
      expect(wardrobe).not.toBeInstanceOf(Error);
      expect(wardrobe._id).toEqual(wardrobeId);
    });

    it('updates name field', async () => {      
      const changedWardrobe = { name: "newTestWardrobe" };
      const res = await wardrobes.updateWardrobe(wardrobeId, changedWardrobe);
      expect(res).not.toBeInstanceOf(Error);         
      expect(res._id).toEqual(wardrobeId);
    });

    it('does not update userId field', async () => {
      const changedWardrobe = { userId: 200 };
      const res = await wardrobes.updateWardrobe(wardrobeId, changedWardrobe);
      expect(res).toBeInstanceOf(Error);
    });

    it('deletes from wardrobes', async () => {
      const createdWardrobe = await wardrobes.getById(wardrobeId);
      const res = await wardrobes.deleteById(wardrobeId);
      expect(res).not.toBeInstanceOf(Error);
      expect(res).toEqual(createdWardrobe);
    });

    it('does not create wardrobe without a userId', async () => {
      const invalidWardrobe = Object.assign({}, createWardrobe);
      delete invalidWardrobe.userId;
      const res = await wardrobes.createWardrobe(invalidWardrobe);
      expect(res).toBeInstanceOf(Error);
    });
  })
});