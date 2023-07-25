const mongoose = require('mongoose');
const { MONGO_URI } = require('../envVars');


/*
  Thoughts:
    What exactly will we save on an article of clothing?
    Will each article of clothing get it's own schema?
    What about extensibility (e.g. jewelry, shoes, accessories)?
*/ 
const clothingSchema = new Schema({

});
const Clothes = mongoose.model('clothes', clothingSchema);

module.exports = {
  Clothes
};