const mongoose = require('mongoose');
const { Pool } = require('pg');
const { MONGO_URI, PSQL_URI } = require('../envVars');

const pDb = new Pool({
  connectionString: PSQL_URI
});
const mDb = mongoose.createConnection(MONGO_URI);
const Schema = mongoose.Schema;

/*
  Thoughts:
    What exactly will we save on an article of clothing?
    Will each article of clothing get it's own schema?
    What about extensibility (e.g. jewelry, shoes, accessories)?
    Since there are clothes stored in Mongo and Postgres, should this be 2 files
*/ 
const pClothes = {};

pClothes.createClothing = (clothingObj) => {
  const createQuery = `
  `;

  
};

pClothes.getById = (id) => {

};

pClothes.deleteById = (id) => {

};

const clothingSchema = new Schema({

});
const mClothes = mongoose.model('clothes', clothingSchema);

module.exports = {
  pDb,
  mDb,
  pClothes,
  mClothes
};