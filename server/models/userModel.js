const pgp = require('pg-promise');
const { PSQL_URI } = require('../envVars');
const bcrypt = require('bcrypt');

const db = pgp(PSQL_URI);

/*
  TODO:
    Add a link to the schema chart once created
*/
module.exports = {
  query: (text, params) => {
    console.log('executed query', text);
    return db.query(text, params);
  }
};