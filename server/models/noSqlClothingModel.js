const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
  Thoughts:
    What exactly will we save on an article of clothing?
    Will each article of clothing get it's own schema?
    What about extensibility (e.g. jewelry, shoes, accessories)?
    Since there are clothes stored in Mongo and Postgres, should this be 2 files
*/ 

const clothingSchema = new Schema({
  name: { type: String, required: true },
  link: String,
  colors: Array,
  patterns: Array,
  fabrics: Array,
  picture: String,
  thumbnail: String,
});
const clothes = mongoose.model('clothes', clothingSchema);

module.exports = {
  clothes,
  m: clothes
};