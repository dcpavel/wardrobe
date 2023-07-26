const { wardrobes } = require('../models/userModel');

const createErr = (errInfo) => {
  const { method, type, err } = errInfo
  return {
    log: `wardrobeController.${method} ${type}: ERROR: ${
      typeof err === "object" ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in wardrobeController.${method}. ${type}`,
    },
  }
}

const wardrobeController = {};

module.exports = wardrobeController;