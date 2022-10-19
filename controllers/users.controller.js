const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const verifyEmail = require("../middlewares/userValidations");
const usersGet = (req = request, res = response) => {
  const { q, name = "No name", apikey, page = 1, limit } = req.query;
  res.json({
    msg: "get API - Controller",
    q,
    name,
    apikey,
    page,
    limit,
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

const usersPut = (req, res) => {
  const { id } = req.params.id;
  res.json({
    msg: "put API - Controller",
    val: `user ${id} was added`,
  });
};

const usersPatch = (req, res) => {
  res.json({
    msg: "Patch API - Controller",
  });
};

const usersDelete = (req, res) => {
  res.json({
    msg: "delete API - Controller",
  });
};

module.exports = { usersGet, usersPost, usersPut, usersPatch, usersDelete };
