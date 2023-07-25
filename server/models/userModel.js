const { Pool } = require('pg');
const { PSQL_URI } = require('../envVars');

const pool = new Pool({
  connectionString: PSQL_URI
});

/*
  TODO:
    Add a link to the schema chart once created
*/
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback)
  }
};