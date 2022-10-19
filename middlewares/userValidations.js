const { validationResult } = require("express-validator");

const validateUserInfo = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json(errors);
  }
  next();
};

module.exports = { validateUserInfo };
