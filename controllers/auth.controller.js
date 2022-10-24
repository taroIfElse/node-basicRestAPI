const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/generJWT");
const authPost = async (req, res) => {
  const { email, password } = req.body;
  try {
    //verificar si el correo existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: `This email is not registered in DB`,
      });
    }
    //si el usuario esta activo
    const { state } = user;
    if (!state) {
      return res.status(400).json({
        msg: "The user is not registered in DB",
      });
    }
    //verificar la contraseña
    const validPass = bcryptjs.compareSync(password, user.password);
    if (!validPass) {
      return res.status(400).json({
        msg: "Invalid Password",
      });
    }
    //generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Please contact with an administrator",
    });
  }
};

module.exports = { authPost };
