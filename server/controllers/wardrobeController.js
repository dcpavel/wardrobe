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
    userId: Number(req.cookies.SSID)
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
    }))
  }
}

module.exports = wardrobeController;