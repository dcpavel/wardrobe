const { clothes } = require('../models/clothingModel');

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

module.exports = clothingController;