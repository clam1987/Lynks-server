const router = require("express").Router();
const matchUsersController = require("../../controllers/MatchUsersController");

router
  .route("/:id")
  .put(matchUsersController)
  .get(matchUsersController);

    

module.exports = router;