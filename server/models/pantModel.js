const mongoose = require('mongoose');
const { MONGO_URI } = require('../envVars');


/*
  Thoughts:
    What exactly will we save on an article of clothing?
    Will each article of clothing get it's own schema?
    What about extensibility (e.g. jewelry, shoes, accessories)?
*/ 
const pantSchema = new Schema({

});
const Pants = mongoose.model('pant', pantSchema);

module.exports = {
  Pants
};