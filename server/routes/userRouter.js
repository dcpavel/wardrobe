const express = require('express');

// require any necessary controllers here
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/',
  // userController.isLoggedIn,
  (_, res) => {
    return res
      .status(200)
      .json(res.locals.user);
  }
);

router.post('/',
  userController.createUser,
  (_, res) => {
    return res
      .status(201)
      .json(res.locals.user);
  }
);

router.get('/login',
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (_, res) => {
    if (res.locals.error) {
      return res.redirect('/login');
    } else {
      return res.redirect('/wardrobe');
    }
  }
);

module.exports = router;