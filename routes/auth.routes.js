const { Router } = require("express");
const { check } = require("express-validator");
const { authPost } = require("../controllers/auth.controller");
const { validateUserInfo } = require("../middlewares/userValidations");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Please put a correct email").isEmail(),
    check("password", "Please put a password").not().isEmpty(),
  ],
  validateUserInfo,
  authPost
);

module.exports = router;
