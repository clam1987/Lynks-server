const router = require("express").Router();
const likedUsersController = require("../../controllers/LikedUsersControl");

router
  .route("/:id")
  .put(likedUsersController.postLikedUser)
  .get(likedUsersController.getLikedUserInfo);

    

module.exports = router;