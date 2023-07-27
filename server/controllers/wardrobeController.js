const { resolvePath } = require('react-router');
const { wardrobes } = require('../models/wardrobeModel');

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

wardrobeController.create = async (req, res, next) => {
  const newWardrobe = {
    name: req.body.name,
    userId: res.locals.user._id
  }
  console.log(newWardrobe);

  try {
    const wardrobe = await wardrobes.createWardrobe(newWardrobe);
    res.locals.wardrobe = wardrobe;

    return next();
  } catch (err) {
    return next(createErr({
      method: 'create',
      type: 'Error creating new wardrobe',
      err
    }));
  }
}

wardrobeController.getOneById = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const wardrobe = await wardrobes.getById(id);
    res.locals.wardrobe = wardrobe;

    return next();
  } catch (err) {
    return next(createErr({
      method: 'getOneById',
      type: 'Error querying by id',
      err
    }));
  }
}

wardrobeController.getByUserId = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const wardrobeList = await wardrobes.getAllByUserId(id);
    res.locals.wardrobes = wardrobeList;

    return next();
  } catch (err) {
    return next(createErr({
      method: 'getByUserId',
      type: 'Error querying by user id',
      err
    }));
  }
}

module.exports = wardrobeController;