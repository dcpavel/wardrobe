const db = require('../../server/models/userModel');

describe('Postgres unit tests', () => {
  describe('We can connect to the database', () => {
    it('connects to the database', () => {
      expect(db).not.toBeInstanceOf(Error);
      expect(db).toHaveProperty('query');
    });
  });

  describe('we can access the user table', () => {
    const writeQuery = `
        INSERT INTO users(
          firstname,
          lastname,
          username,
          password,
          email
        ) VALUES (
          $1, $2, $3, $4, $5
        );
      `;
    const user = ['first', 'last', 'username', 'password', 'test@email.com'];
    
    it('writes to users', async () => {     
      const newUser = await db.query(writeQuery, user);
      expect(newUser).not.toBeInstanceOf(Error);
      expect(newUser.length).toEqual(1);
    });

    

    it('reads from users', async () => {
      const readQuery = 'SELECT * FROM users;';
      const users = await db.query(readQuery);
      expect(users).toBeInstanceOf(Array);
      expect(users.length).toBeGreaterThan(0);
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