const router = require("express").Router();
const addressController = require("../../controllers/AddressController");

router.route("/")
  .get(addressController.getAllLynksAddress);

router.route("/:id")
  .put(addressController.submitAddress);


module.exports = router;
