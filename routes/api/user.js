const router = require("express").Router();
const userController = require("../../controllers/UserController");
const passport = require("../../configs/passport");

router.route("/").get(userController.getAllUsers);

router.route("/:id").get(userController.getUser);

router.route("/signup").post(userController.signup);

router.route("/location/:locationId").get(userController.getAllUsersInLocation);

router.route("/matched/:id").put(userController.updateMatch);

router
  .route("/login")
  .post(passport.authenticate("local"), userController.login);

router.route("/logout").get(userController.logout);

module.exports = router;
