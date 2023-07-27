const Session = require('../models/sessionModel');

const createErr = (errInfo) => {
  const { method, type, err } = errInfo
  return {
    log: `sessionController.${method}: ${type}: ERROR: ${
      typeof err === "object" ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in sessionController.${method}. ${type}`,
    },
  }
}

const sessionController = {};

sessionController.isLoggedIn = async (req, res, next) => {
  if (req.cookies.SSID === undefined) {
    res.locals.errors = 'Not logged in';
    return res.status(403).redirect('/login');
  } else {
    try {
      const sessionId = req.cookies.SSID;
      const user = await Session.findById(sessionId).exec();
      
      res.locals.user = {};
      res.locals.user._id = Number(user.cookieId);
      
      return next();
    } catch (err) {
      return next(createErr({
        method: 'isLoggedIn',
        type: 'Problem getting a valid session',
        err
      }));
    }
  }

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

    res.locals.ssid = session._id;

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