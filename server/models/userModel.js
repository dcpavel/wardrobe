const { Pool } = require('pg');
const { PSQL_URI } = require('../envVars');
const bcrypt = require('bcrypt');

const db = new Pool({
  connectionString: PSQL_URI
});

const users = {};

const encryptPass = async (password) => {
  const WORK_FACTOR = 10;

  const salt = await bcrypt.genSalt(WORK_FACTOR);
  const encPassword = await bcrypt.hash(password, salt);

  return encPassword;
}

// get all users
users.getAll = async () => {
  try {
    const queryAll = 'SELECT * FROM users';
    const res = await db.query(queryAll);
    
    return res.rows;
  } catch (err) {
    return err;
  }
};

// get user by id
users.getById = async (id) => {
  try {
    const queryId = 'SELECT * FROM users WHERE _id=$1';
    const res = await db.query(queryId, [id]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

// get user by username
users.getByUsername = async (username) => {
  try {
    const queryUser = 'SELECT * FROM users WHERE username=$1';
    const res = await db.query(queryUser, [username]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

// verify user
users.verifyUser = async ({ username, password }) => {
  try {
    const dbUser = await users.getByUsername(username);
    const dbPassword = dbUser.password;

    const res = await bcrypt.compare(password, dbPassword);
    return res;
  } catch (err) {
    return err;
  }
};

// create user
users.createUser = async (userObj) => {
  try {
    const {
      firstname,
      lastname,
      username,
      password,
      email
    } = userObj;

    if (password === '') {
      throw Error('Cannot have null password');
    }

    const encPassword = await encryptPass(password);

    const createQuery = `
      INSERT INTO users
        ( firstname, lastname, username, password, email )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const res = await db.query(
      createQuery,
      [ firstname, lastname, username, encPassword, email ]
    );

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

// delete by id
users.deleteById = async (id) => {
  try {
    const delQuery = `
      DELETE FROM users
      WHERE _id=$1
      RETURNING *;
    `;
    const res = await db.query(delQuery, [ id ]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

// update user by using id
users.updateUser = async (id, userObj) => {
  try {
    const {
      firstname,
      lastname,
      username,
      email
    } = userObj;
    
    // shouldn't change username
    const currUser = await users.getById(id);
    if (username !== currUser.username) {
      throw Error('Cannot change username')
    }

    const updateQuery = `
      UPDATE users 
      SET (firstname, lastname, email) = ( $1, $2, $3)
      WHERE _id=$4
      RETURNING *;
    `;
    const res = await db.query(
      updateQuery,
      [ firstname, lastname, email, id ]
    );
    
    return res.rows[0];
  } catch (err) {
    return err;
  }
}

// change password
users.updatePassword = async (id, newPassword) => {
  try {
    const user = await users.getById(id);

    // if the passwords don't match, change the password
    // NOTE: WE NEED TO ONLY RUN THIS IF USER IS LOGGED IN
    if (!users.verifyUser(user.username, newPassword)) {
      const updateQuery = `
        UPDATE users 
        SET password=$1
        WHERE _id=$2
        RETURNING *;
      `;
      const encPassword = encryptPass(newPassword);

      const res = await db.query(
        updateQuery,
        [ encPassword, id ]
      );
      user = res.rows[0];
    }

    return user;
  } catch (err) {
    return err;
  }
}

/*
  TODO:
    Add a link to the schema chart once created
*/
module.exports = {
  users,
  db
};