const express = require('express');
const sessionController = require('../controllers/sessionController');
const clothingController = require('../controllers/clothingController');
const wardrobeController = require('../controllers/wardrobeController');
const clothingTypeController = require('../controllers/clothingTypeController');

// require any necessary controllers here
// const clothingController = require('../controllers/clothingController);

const router = express.Router();

router.get('/',
  sessionController.isLoggedIn,
  wardrobeController.getByUserId,
  clothingTypeController.getAll,
  (_, res) => {
    return res
      .status(200)
      .json(res.locals);
  }
);

router.get('/:id',
  sessionController.isLoggedIn,
  wardrobeController.getByUserId,
  clothingTypeController.getAll,
  clothingController.getById,
  (_, res) => {
    return res
      .status(200)
      .json(res.locals);
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

router.post('/',
  sessionController.isLoggedIn,
  clothingController.create,
  (_, res) => {
    return res
      .status(201)
      .json(res.locals.clothing)
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