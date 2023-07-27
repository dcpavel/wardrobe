const Session = require('../models/sessionModel');

const createErr = (errInfo) => {
  const { method, type, err } = errInfo
  return {
    log: `sessionController.${method} ${type}: ERROR: ${
      typeof err === "object" ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in sessionController.${method}. ${type}`,
    },
  }
}

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  if (req.cookies.SSID === undefined) {
    res.locals.errors = 'Not logged in';
    return res.status(403).redirect('/login');
  }

  return next();
}

sessionController.startSession = async (req, res, next) => {
  try {
    if (!res.locals.user) {
      return next();
    }

    const ssidCookie = {
      cookieId: res.locals.user._id
    };
    const session = await Session.findOneAndUpdate( ssidCookie, ssidCookie, { upsert: true });

    return next();
  } catch (err) {
    return next(createErr({
      method: 'startSession',
      type: 'Something has occurred when creating the cookie',
      err
    }));
  }
}

module.exports = sessionController;