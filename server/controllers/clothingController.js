const m = require('../models/noSqlClothingModel');
const p = require('../models/sqlClothingModel');
const wardrobes = require('../models/wardrobeModel');
const fs = require('fs');
const sharp = require('sharp');

const pClothes = p.clothes;
const mClothes = m.clothes;

const createErr = (errInfo) => {
  const { method, type, err } = errInfo
  return {
    log: `clothingController.${method} ${type}: ERROR: ${
      typeof err === "object" ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in clothingController.${method}. ${type}`,
    },
  }
}

const clothingController = {};

clothingController.create = (req, res, next) => {

}

clothingController.getAllByWardrobe = async (req, res, next) => {
  try {
    const { id } = req.params;

    const wardrobe = await wardrobes.getById(id);
    if (wardrobe.userId !== res.locals.user._id) {
      throw Error('User does not have permission to view this wardrobe')
    }

    // get the clothes from the SQL database
    const allClothes = await p.clothes.getByWordrobeId(id);

    // attach the NoSQL data and feed to res.locals.clothes
    res.locals.clothes = allClothes.map(async (clothing) => {
        const noSqlInfo = await m.clothes.findById(clothing.nosqlkey);

        // NoSQL goes first so _id can be replaced by the SQL one
        return Object.assign(noSqlInfo, clothing);
      });

    return next();
  } catch (err) {
    return next(createErr({
      method: 'getAllByWardrobe',
      type: 'Problem getting clothing by wardrobe',
      err
    }));
  }
}

module.exports = clothingController;