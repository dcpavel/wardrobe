const express = require('express');

// require any necessary controllers here
// const clothingTypesController = require('../controllers/clothingTypesController);

const router = express.Router();

router.get('/',
  (_, res) => {
    return res
      .status(200)
      .json(res.locals.types);
  }
);

module.exports = router;