const { Pool } = require('pg');
const { PSQL_URI } = require('../envVars');

const db = new Pool({
  connectionString: PSQL_URI
});

/*
  Thoughts:
    What exactly will we save on an article of clothing?
    Will each article of clothing get it's own schema?
    What about extensibility (e.g. jewelry, shoes, accessories)?
    Since there are clothes stored in Mongo and Postgres, should this be 2 files
*/ 
const clothes = {};

clothes.createClothing = (clothingObj) => {
  const createQuery = `
  `;

  
};

clothes.getById = (id) => {

};

clothes.deleteById = (id) => {

};

module.exports = {
  db,
  clothes
};