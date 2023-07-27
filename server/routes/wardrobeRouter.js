const express = require('express');

// require any necessary controllers here
const wardrobeController = require('../controllers/wardrobeController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/',
  sessionController.isLoggedIn,  
  (_, res) => {
    return res
      .status(200)
      .json(res.locals.wardrobes);
  }
);

router.post('/',
  sessionController.isLoggedIn,
  wardrobeController.create,
  (_, res) => {
    return res
      .status(201)
      .json(res.locals.wardrobe)
  }
);

module.exports = router;