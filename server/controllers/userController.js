const { users } = require('../models/userModel');

const createErr = (errInfo) => {
  const { method, type, err } = errInfo
  return {
    log: `userController.${method} ${type}: ERROR: ${
      typeof err === "object" ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in userController.${method}. ${type}`,
    },
  }
}

const userController = {};

userController.createUser = (req, res, next) => {
  const fields = {
    firstname: true,
    lastname: false,
    username: true,
    password: true,
    email: true,
  };

  const userObj = {};
  for (const field in fields) {
    const required = fields[field];
    if (required && !req.body[field]) {
      return next(createErr({
        method: 'createUser',
        type: 'A required field was missing'        
      }));
    }

    userObj[field] = req.body[field];
  }
  const newUser = users.createUser(userObj);
  res.locals.user = newUser;

  return next();
};

userController.login = (req, res, next) => {

};

module.exports = userController;