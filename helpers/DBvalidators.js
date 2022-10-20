const Role = require("../models/role");
const { check } = require("express-validator");
const Usuario = require("../models/user");
const existRoleInDB = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`The rol ${role} is not registered in DB`);
  }
};
const existUserById = async (id) => {
  const existUser = await Usuario.findById(id);
  if (!existUser) {
    throw new Error(`The userID ${id} is not registered in DB`);
  }
};

const infoUserConstPut = async () => {
  [
    check("id", "Is not a Mongo ID").isMongoId(),
    check("id").custom(existUserById),
    check("role").custom(existRoleInDB),
  ];
};

const infoUserConst = [
  check("email", "Please, use a correct email").isEmail(),
  check("name", "Please, enter a name").not().isEmpty(),
  check("password", "Please, enter a correct password {+6 letters}").isLength({
    min: 7,
  }),
  check("role").custom(existRoleInDB),
];

module.exports = {
  infoUserConst,
  existUserById,
  existRoleInDB,
  infoUserConstPut,
};
