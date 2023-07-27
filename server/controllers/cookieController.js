const createErr = (errInfo) => {
  const { method, type, err } = errInfo
  return {
    log: `cookieController.${method} ${type}: ERROR: ${
      typeof err === "object" ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in cookieController.${method}. ${type}`,
    },
  }
}

const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  try {
    if (!res.locals.user) {
      return next();
    }

    res.cookie('SSID', res.locals.ssid, { httpOnly: true });
    return next();
  } catch (err) {
    return next(createErr({
      method: 'setSSIDCookie',
      err
    }));
  }
}

module.exports = cookieController;