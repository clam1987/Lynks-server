const db = require("../models");
const { User, LynksAddress } = db;
const { addressFormatter } = require("../utils/util");

module.exports = {
  submitAddress: async (req, res) => {
    try {
      const { id } = req.params;
      const { address } = req.body;
      const lynkedAddressArr = await User.findById(id).populate(
        "lynksLocation"
      );
      const lynksAddress = await LynksAddress.find();
      if (
        lynkedAddressArr.lynksLocation.length <=
        lynkedAddressArr.maxAvailableLocations
      ) {
        const formatAddressInput = addressFormatter(address);
        const userHasSameAddress = lynkedAddressArr.lynksLocation.some(
          (val) => {
            const formatAddress = addressFormatter(val.address);
            return formatAddress === formatAddressInput;
          }
        );
        const duplicateAddressExists = lynksAddress
          .map((addresses) => addresses.address)
          .indexOf(address);
        if (userHasSameAddress) {
          res.status(500).send("location already exists");
        } else if (duplicateAddressExists !== -1 && !userHasSameAddress) {
          await LynksAddress.findOneAndUpdate(
            { _id: lynksAddress[duplicateAddressExists]._id },
            { $push: { users: id } },
            { new: true }
          );
          const dbUser = await User.findOneAndUpdate(
            { _id: id },
            {
              $push: {
                lynksLocation: lynksAddress[duplicateAddressExists]._id,
              },
            },
            { new: true }
          );
          res.status(200).json(dbUser);
        } else {
          const { id: locationId } = await LynksAddress.create(req.body);
          await LynksAddress.findOneAndUpdate(
            { _id: locationId },
            { $push: { users: id } },
            { new: true }
          );
          const dbUser = await User.findOneAndUpdate(
            { _id: id },
            { $push: { lynksLocation: locationId } },
            { new: true }
          );
          res.status(200).json(dbUser);
        }
      } else {
        res.status(500).send("You reached the max saved locations allowed");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
  },
  get25RadiusLynksAddress: async ({ params }, res) => {
    try {
      const { lat, lng } = params;
      LynksAddress.createIndexes({ "location": "2dsphere" })
      const data = await LynksAddress.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
            $maxDistance: 24140.2
          }
        }
      }).populate("users");
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
  },
  getAllLynksAddress: async (req, res) => {
    try {
        const data = await LynksAddress.find().populate("users")
        return res.status(200).json(data);
    } catch(err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
},
  updateAddressUser: async (req, res) => {
    try {
      const { addressid } = req.params;
      const { userId } = req.body
      const data = await LynksAddress.findOneAndUpdate({ _id: addressid }, { $push: { users: userId } }, { new: true });
      res.json(data); 
    } catch(err) {
      console.error(err)
    }
  },
};
