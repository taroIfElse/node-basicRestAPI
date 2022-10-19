const Role = require("../models/role");
const { check } = require("express-validator");

const infoUserConst = [
  check("email", "Please, use a correct email").isEmail(),
  check("name", "Please, enter a name").not().isEmpty(),
  check("password", "Please, enter a correct password {+6 letters}").isLength({
    min: 7,
  }),
  check("role").custom(async (role = "") => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
      throw new Error(`The rol ${role} is not registered in DB`);
    }
  }),
];

module.exports = infoUserConst;
