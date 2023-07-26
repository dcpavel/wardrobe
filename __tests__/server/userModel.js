const { users, db } = require('../../server/models/userModel');

describe('Postgres unit tests', () => {
  afterAll(() => {
    db.end();
  });

  describe('We can connect to the database', () => {
    it('connects to the database', () => {
      expect(db).not.toBeInstanceOf(Error);
      expect(db).toHaveProperty('query');
    });
  });

  describe('we can access the user table', () => {
    const createUser = {
      firstname: 'first',
      lastname: 'last',
      username: 'username',
      password: 'password',
      email: 'test@email.com'
    };
    
    it('writes to users', async () => {     
      const res = await users.createUser(createUser);
      expect(res).not.toBeInstanceOf(Error);
      expect(res.rowCount).toEqual(1);
    });    

    it('reads from users', async () => {
      const allUsers = await users.getAll();
      expect(allUsers).toBeInstanceOf(Array);
      expect(allUsers.length).toBeGreaterThan(0);
    });

    it('updates user fields', async () => {      
      const { _id } = await users.getByUsername(createUser.username);

      for (const field in createUser) {
        // every field but username should be variable        
        const changedUser = Object.assign({}, createUser);

        // we will change password separately
        delete changedUser.password;
        changedUser[field] += '2';

        const res = await users.updateUser(_id, changedUser);
        if (field !== 'username') {
          console.log(res); 
          expect(res).not.toBeInstanceOf(Error);         
          expect(res.rowCount).toEqual(1);
        } else {
          expect(res).toBeInstanceOf(Error);
        }
      }
    });

    it('deletes from users', async () => {
      const createdUser = await users.getByUsername(createUser.username);
      const res = await users.delById(createdUser._id);
      expect(res).not.toBeInstanceOf(Error);
      expect(res.rowCount).toEqual(1);
    });

    it('errors on required fields', async () => {
      for (const field in createUser) {
        // lastname isn't a required field, omit that test
        if (field !== 'lastname') {
          const errUser = Object.assign({}, createUser);
          errUser[field] = '';
          const res = await users.createUser(errUser);
          expect(res).toBeInstanceOf(Error);
        }
      }
    });
  })
});

/*
Saving for future reference:
  const createTempUsers = `
    CREATE TEMP TABLE temp_users (
      _id integer PRIMARY KEY,
      firstName varchar(40) NOT NULL,
      lastName varchar(40),
      userName varchar(40) UNIQUE NOT NULL,
      password varchar(80) NOT NULL,
      email varchar(40) UNIQUE NOT NULL
    );
  `;

  const createTempWardrobes = `
    CREATE TEMP TABLE temp_wardrobes (
      _id SERIAL PRIMARY KEY,
      userId integer references users(_id),
      name varchar(80)
    );
  `;
    
  const createTempClothingTypes = `
    CREATE TEMP TABLE temp_clothingTypes (
      _id SERIAL PRIMARY KEY,
      name varchar(80) UNIQUE NOT NULL,
      bodyPosition varchar(80) NOT NULL
    );
  `;
    
  const createTempClothing = `
    CREATE TEMP TABLE temp_clothing (
      _id SERIAL PRIMARY KEY,
      wardrobeId INT references wardrobes(_id),
      typeId INT references clothingTypes(_id),
      noSqlKey varchar(80),
      createdOn timestamp,
      lastModified timestamp
    );
  `; 
*/