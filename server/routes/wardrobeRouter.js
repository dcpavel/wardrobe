const express = require('express');

// require any necessary controllers here
// const wardrobeController = require('../controllers/wardrobeController);

const router = express.Router();

router.get('/',
  (_, res) => {
    return res
      .status(200)
      .json(res.locals.wardrobe);
  }
);

module.exports = router;