const { Router } = require("express");
const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require("../controllers/users.controller");
const { validateUserInfo } = require("../middlewares/userValidations");
const infoUserConst = require("../helpers/DBvalidators");
const router = Router();

router.get("/", usersGet);
router.put("/:id", usersPut);
router.post("/", infoUserConst, validateUserInfo, usersPost);
router.patch("/", usersPatch);
router.delete("/", usersDelete);

module.exports = router;
