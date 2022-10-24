const isAdminRole = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({ msg: "The token have to be validated" });
  }
  const { role, name } = req.user;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `The user ${name} is not an admin`,
    });
  }
  next();
};

module.exports = { isAdminRole };
