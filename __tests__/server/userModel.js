const { users, db } = require('../../server/models/userModel');

describe('Postgres user table unit tests', () => {

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
    // this gets set in the first test
    let id;

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
      expect(res).toHaveProperty('_id');

      id = res._id;
    });    

    it('reads from users', async () => {
      const allUsers = await users.getAll();
      expect(allUsers).toBeInstanceOf(Array);
      expect(allUsers.length).toBeGreaterThan(0);
    });

    it('gets a user by id', async () => {
      const user = await users.getById(id);
      expect(user).not.toBeInstanceOf(Error);
      expect(user._id).toEqual(id);
    });

    it('gets a user by username', async () => {
      const user = await users.getByUsername(createUser.username);
      expect(user).not.toBeInstanceOf(Error);
      expect(user._id).toEqual(id);
    });

    it('validates a correct password', async () => {
      const testLogin = {
        username: createUser.username,
        password: createUser.password
      };

      const res = await users.verifyUser(testLogin);
      expect(res).toEqual(true);
    });

    it('does not validate an incorrect password', async () => {
      const testLogin = {
        username: createUser.username,
        password: 'fail'
      };

      const res = await users.verifyUser(testLogin);
      expect(res).toEqual(false);
    });

    it('updates user fields', async () => {      
      for (const field in createUser) {
        // every field but username should be variable        
        const changedUser = Object.assign({}, createUser);

        // we will change password separately
        delete changedUser.password;
        changedUser[field] += '2';

        const res = await users.updateUser(id, changedUser);
        if (field !== 'username') {
          expect(res).not.toBeInstanceOf(Error);         
          expect(res.field).toEqual(changedUser.field);
        } else {
          expect(res).toBeInstanceOf(Error);
        }
      }
    });

    it('changes a user\'s password', async () => {      
      const newPassword = 'newPassword';
      const res = await users.updatePassword(id, newPassword);
      expect(res).not.toBeInstanceOf(Error);
      expect(res).toHaveProperty('_id');
    });

    it('deletes from users', async () => {
      const createdUser = await users.getById(id);
      const res = await users.deleteById(id);
      expect(res).not.toBeInstanceOf(Error);
      expect(res).toEqual(createdUser);
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