const { m } = require('../models/noSqlClothingModel');
const { p } = require('../models/sqlClothingModel');
const { wardrobes } = require('../models/wardrobeModel');
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

clothingController.create = async (req, res, next) => {
  try {
    console.log(req.body);
    const noSqlData = {
      name: req.body.name,
      colors: req.body.colors.split(' '),
      patterns: req.body.patterns.split(' '),
      fabrics: req.body.fabrics.split(' ')
    };
    const noSql = await m.create(noSqlData);

    const sqlData = {
      wardrobeId: Number(req.body.wardrobe),
      typeId: Number(req.body.type),
      noSqlKey: String(noSql._id),
    };
    const sql = await p.createClothing(sqlData);
    res.locals.clothing = sql;

    return next();
  } catch (err) {
    return next(createErr({
      method: 'getAllByWardrobe',
      type: 'Problem getting clothing by wardrobe',
      err
    }));
  }
}

clothingController.getAllByWardrobe = async (req, res, next) => {
  try {
    const { id } = req.params;

    const wardrobe = await wardrobes.getById(id);
    if (wardrobe.userid !== res.locals.user._id) {
      throw Error('User does not have permission to view this wardrobe')
    }

    // get the clothes from the SQL database
    const allClothes = await p.getByWardrobeId(id);
    console.log(allClothes);

    // attach the NoSQL data and feed to res.locals.clothes
    res.locals.clothes = [];
    for (const clothing of allClothes) {
      const sqlKey = String(clothing.nosqlkey);
      const noSqlInfo = await m.findById(sqlKey);

      // NoSQL goes first so _id can be replaced by the SQL one
      const combined = Object.assign({}, noSqlInfo._doc, clothing);
      res.locals.clothes.push(combined);
    }    
    console.log(res.locals.clothes);

    return next();
  } catch (err) {
    return next(createErr({
      method: 'getAllByWardrobe',
      type: 'Problem getting clothing by wardrobe',
      err
    }));
  }
}

clothingController.getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const wardrobe = await wardrobes.getById(id);
    if (wardrobe.userId !== res.locals.user._id) {
      throw Error('User does not have permission to view this wardrobe')
    }

    // get the clothes from the SQL database
    const clothing = await p.clothes.getById(id);

    // attach the NoSQL data and feed to res.locals.clothes
    const noSqlInfo = await m.clothes.findById(clothing.nosqlkey);
    // NoSQL goes first so _id can be replaced by the SQL one
    res.locals.clothing = Object.assign({}, noSqlInfo._doc, clothing);

    return next();
  } catch (err) {
    return next(createErr({
      method: 'getAllByWardrobe',
      type: 'Problem getting clothing by id',
      err
    }));
  }
}

module.exports = clothingController;