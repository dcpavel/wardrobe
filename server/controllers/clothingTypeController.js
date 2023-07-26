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

module.exports = clothingTypeController;