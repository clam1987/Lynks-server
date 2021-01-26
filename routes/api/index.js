const router = require("express").Router();
const userRoutes = require("./user");
const addressRoutes = require("./address");
const likedUsersRoutes = require("./likedUsers");
const isUserAuthenticated = require("../../middleware/isAuthenticated");

router.use("/users", userRoutes);
router.use("/addresses", addressRoutes);
router.use("/likedusers", likedUsersRoutes);

router.get("/secret", isUserAuthenticated, (req, res) => {
  res.send("this is a secret!");
});

module.exports = router;
