const { Router } = require("express");
const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require("../controllers/users.controller");
const { validateUserInfo } = require("../middlewares/userValidations");
const {
  infoUserConst,
  infoUserConstPut,
  infoUserConstDelete,
} = require("../helpers/DBvalidators");
const router = Router();

router.get("/", usersGet);
router.put("/:id", infoUserConstPut, validateUserInfo, usersPut);
router.post("/", infoUserConst, validateUserInfo, usersPost);
router.patch("/", usersPatch);
router.delete("/:id", infoUserConstDelete, validateUserInfo, usersDelete);

module.exports = router;
