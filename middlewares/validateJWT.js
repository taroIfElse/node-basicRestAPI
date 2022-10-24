const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const validateJSONWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ msg: "No token in the request" });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);
    req.user = user;
    if (!user) {
      return res.status(401).json({ msg: "The user does not exist in DB" });
    }
    const { state } = user;
    if (!state) {
      return res.status(401).json({ msg: "Token no valid: user state false" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "No valid token",
    });
  }
};

module.exports = { validateJSONWT };
