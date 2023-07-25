const express = require('express');

// require any necessary controllers here
// const userController = require('../controllers/userController);

const router = express.Router();

router.get('/',
  // userController.isLoggedIn,
  (_, res) => {
    return res
      .status(200)
      .json(res.locals.user);
  }
);

module.exports = router;