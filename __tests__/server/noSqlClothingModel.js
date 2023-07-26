const { clothing, db } = require('../../server/models/noSqlClothingModel');

describe('MongoDB clothing collection unit tests', () => {
  afterAll(async () => {
    await db.close();
  });

  describe('We can connect to the database', () => {
    it('connects to the database', () => {
      expect(db).not.toBeInstanceOf(Error);
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
      const res = await clothing.createClothing(createClothing);

      expect(res).not.toBeInstanceOf(Error);
      expect(res).toHaveProperty('_id');

      id = res._id;
    });

    xit('gets one clothing record by id', async () => {
      const clothing = await clothing.getById(clothingId);

      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing).toHaveProperty('_id');
    });

    xit('we can update the name', async () => {
      const newName = 'newName';
      const changedClothing = Object.assign({}, createClothing, { name: newName });
      const clothing = await clothing.update(changedClothing);

      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing.name).toEqual(newName);
    });

    xit('we can update a link', async () => {
      const newLink = 'http://www.foo.bar/';
      const changedClothing = Object.assign({}, createClothing, { link: newLink });
      const clothing = await clothing.update(changedClothing);

      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing.link).toEqual(newLink);
    });

    xit('we can update colors', async () => {
      const newColors = [ 'newColor' ];
      const changedClothing = Object.assign({}, createClothing, { colors: newColors });
      const clothing = await clothing.update(changedClothing);

      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing.colors).toEqual(newColors);
    });

    xit('we can update patters', async () => {
      const newPattern = [ 'newPattern' ];
      const changedClothing = Object.assign({}, createClothing, { pattern: newPattern });
      const clothing = await clothing.update(changedClothing);

      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing.pattern).toEqual(newPattern);
    });

    xit('we can update fabrics', async () => {
      const newFabrics = [ 'newFabric' ];
      const changedClothing = Object.assign({}, createClothing, { colors: newFabrics });
      const clothing = await clothing.update(changedClothing);

      expect(clothing).not.toBeInstanceOf(Error);
      expect(clothing.fabrics).toEqual(newFabrics);
    });

    xit('we cannot create clothing without a name', async () => {
      const changedClothing = Object.assign({}, createClothing, { name: '' });
      const clothing = await clothing.create(changedClothing);

      expect(clothing).toBeInstanceOf(Error);
    });

    xit('we can delete the record by id', async () => {
      const createdClothing = await clothing.getById(id);
      const res = await clothing.deleteById(id);

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