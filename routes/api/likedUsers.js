const router = require("express").Router();
const likedUsersController = require("../../controllers/LikedUsersController");

router
  .route("/:id")
  .put(likedUsersController.postLikedUser)
  .get(likedUsersController.getLikedUserInfo);

    

module.exports = router;