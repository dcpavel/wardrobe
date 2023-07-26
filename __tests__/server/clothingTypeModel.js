const { clothingTypes, db } = require('../../server/models/clothingTypeModel');

describe('Postgres clothingTypes table unit tests', () => {
  afterAll(async () => {
    return await db.end();
  });

  describe('We can connect to the database', () => {
    it('connects to the database', () => {
      expect(db).not.toBeInstanceOf(Error);
      expect(db).toHaveProperty('query');
    });
  });

  describe('we can modify the clothingTypes table', () => {
    // this gets set in the first test
    let id;
    
    const createType = {
      name: 'test',
      bodyPosition: 'torso'
    };

    it('writes to clothingTypes', async () => {   
      const res = await clothingTypes.createType(createType);
      expect(res).not.toBeInstanceOf(Error);
      expect(res).toHaveProperty('_id');

      id = res._id;
    });    

    it('reads from clothingTypes', async () => {
      const allTypes = await clothingTypes.getAll();
      expect(allTypes).toBeInstanceOf(Array);
      expect(allTypes.length).toBeGreaterThan(0);
    });

    it('gets a clothingType by id', async () => {
      const type = await clothingTypes.getById(id);
      expect(type).not.toBeInstanceOf(Error);
      expect(type._id).toEqual(id);
    });

    it('updates fields', async () => {      
      for (const field in createType) {
        const changedType = Object.assign({}, createType);
        changedType[field] += '1';
        const res = await clothingTypes.updateType(id, changedType);
        expect(res).not.toBeInstanceOf(Error);         
        expect(res._id).toEqual(id);
      }
    });

    it('will not create a type with duplicate name', async () => {
      const dupType = Object.assign({}, createType, { bodyPosition: 'test2' });
      const res = await clothingTypes.createType(dupType);
      expect(res).toBeInstanceOf(Error);
    });

    it('deletes from clothingTypes', async () => {
      const createdType = await clothingTypes.getById(id);
      const res = await clothingTypes.deleteById(id);
      expect(res).not.toBeInstanceOf(Error);
      expect(res).toEqual(createdType);
    });

    it('does not create clothingType without a name or bodyPosition', async () => {
      for (const field in createType) {
        const changedType = Object.assign({}, createType);
        delete changedType.field;
        const res = await clothingTypes.createType(id, changedType);
        expect(res).toBeInstanceOf(Error)
      }
    });
  })
});