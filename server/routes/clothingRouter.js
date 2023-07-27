const express = require('express');
const sessionController = require('../controllers/sessionController');
const clothingController = require('../controllers/clothingController');

// require any necessary controllers here
// const clothingController = require('../controllers/clothingController);

const router = express.Router();

router.get('/:id',
  (_, res) => {
    return res
      .status(200)
      .json(res.locals.clothes);
  }
);

// get all the clothes belonging to a wardrobe
router.get('/wardrobe/:id',
  sessionController.isLoggedIn,
  clothingController.getAllByWardrobe,
  (_, res) => {
    return res
      .status(200)
      .json(res.locals.clothes)
  }
);

router.post('/:id',
  (_, res) => {
    return res
      .status(201)
      .json(res.locals.clothes)
  }
);

router.put('/:id',
  (_, res) => {
    return res
      .status(201)
      .json(res.locals.clothes)
  }
);

router.delete('/:id',
  (_, res) => {
    return res
      .status(200)
      .json(res.locals.clothes)
  }
);

module.exports = router;