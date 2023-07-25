const express = require('express');

// require any necessary controllers here
// const clothingController = require('../controllers/clothingController);

const router = express.Router();

router.get('/',
  (_, res) => {
    return res
      .status(200)
      .json(res.locals.clothes);
  }
);

module.exports = router;