const router = require("express").Router();
const addressController = require("../../controllers/AddressController");

router.route("/")
  .get(addressController.getAllLynksAddress)

router.route("/25/:lat?/:lng?")
  .get(addressController.get25RadiusLynksAddress);

router.route("/:id")
  .put(addressController.submitAddress);

router.route("/single/:addressid")
  .put(addressController.updateAddressUser);


module.exports = router;
