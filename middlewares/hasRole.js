const userHasRole = (...roles) => {
  return (req, res, next) => {
    console.log(roles);
    if (!req.user) {
      return res.status(500).json({ msg: "The token have to be validated" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: "The service require another role",
      });
    }
    next();
  };
};

module.exports = { userHasRole };
