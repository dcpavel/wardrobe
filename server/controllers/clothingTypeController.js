const { clothingTypes } = require('../models/clothingTypeModel');

const createErr = (errInfo) => {
  const { method, type, err } = errInfo
  return {
    log: `clothingTypeController.${method} ${type}: ERROR: ${
      typeof err === "object" ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in clothingTypeController.${method}. ${type}`,
    },
  }
}

const clothingTypeController = {};

clothingTypeController.getAll = async (req, res, next) => {
  try {
    const types = await clothingTypes.getAll();
    res.locals.types = types;

    return next();
  } catch (err) {
    return next(createErr({
      method: 'getAll',
      type: 'Problem getting all clothing types',
      err
    }));
  }
}

module.exports = clothingTypeController;