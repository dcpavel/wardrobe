const { Pool } = require('pg');
const { PSQL_URI } = require('../envVars');
const bcrypt = require('bcrypt');

const db = new Pool({
  connectionString: PSQL_URI
});
const WORK_FACTOR = 10;

const users = {};

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
users.verifyUser = async (user) => {
  try {
    const dbUser = this.getByUsername(user.username);
    const dbPassword = dbUser.rows[0].password;

    return await bcrypt.compare(user.password, dbPassword);
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

    const salt = await bcrypt.genSalt(WORK_FACTOR);
    const encPassword = await bcrypt.hash(password, salt);

    const createQuery = `
    INSERT INTO users
      ( firstname, lastname, username, password, email )
    VALUES ($1, $2, $3, $4, $5);
    `;
    const res = await db.query(createQuery,
      [firstname, lastname, username, encPassword, email]
    );

    return res;
  } catch (err) {
    return err;
  }
};

// delete by id
users.delById = async (id) => {
  try {
    const delQuery = `DELETE FROM users WHERE _id=$1`;
    const res = await db.query(delQuery, [id]);

    return res;
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
    const currUser = users.getById(id);
    if (username !== currUser.username) {
      throw Error('Cannot change username')
    }

    const updateQuery = `
      UPDATE users 
      SET (firstname, lastname, email) = ( $1, $2, $3)
      WHERE _id=$4
      RETURNING *;
    `;
    const res = await db.query(updateQuery, [ firstname, lastname, email, id ]);
    return res.rows[0];
  } catch (err) {
    return err;
  }
}

/*
  TODO:
    Add a link to the schema chart once created
*/
module.exports = { users, db };