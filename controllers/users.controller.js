const { response, request } = require("express");

const usersGet = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;
  res.json({
    msg: "get API - Controller",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usersPost = (req, res) => {
  const body = req.body;
  res.json({
    msg: "post API - Controller",
    body,
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
