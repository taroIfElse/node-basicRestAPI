const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const usersGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };
  const [users, total] = await Promise.all([
    User.find(query).skip(Number(from)).limit(Number(limit)),
    User.count(query),
  ]);
  res.json({
    total,
    users,
  });
};

const usersPost = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //verificar si el correo existe
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(404).json({
      msg: "This email is already used",
    });
  }

  //encriptar password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //guarda en BD
  await user.save();

  res.json({
    user,
  });
};

const usersPut = async (req, res) => {
  const { id } = req.params;
  const { password, google, email, ...info } = req.body;
  //validar vs bd
  if (password) {
    const salt = bcryptjs.genSaltSync();
    info.password = bcryptjs.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, info);
  res.json({
    user,
  });
};

const usersPatch = (req, res) => {
  res.json({
    msg: "Patch API - Controller",
  });
};

const usersDelete = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { state: false });
  user.save();
  res.json({
    msg: `User ${user.name} was deleted`,
  });
};

module.exports = { usersGet, usersPost, usersPut, usersPatch, usersDelete };
