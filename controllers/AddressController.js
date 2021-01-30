const db = require("../models");
const { User, LynksAddress } = db;
const { addressFormatter } = require("../utils/util");

module.exports = {
    submitAddress: async (req, res) => {
        try {
            const { id } = req.params;
            const { address } = req.body
            const lynkedAddressArr = await User.findById(id).populate("lynksLocation");
            const lynksAddress = await LynksAddress.find();
            // console.log(lynksAddress.map(x => x.users.indexOf(id) === -1));
            if(lynkedAddressArr.lynksLocation.length <= lynkedAddressArr.maxAvailableLocations) {
                const formatAddressInput = addressFormatter(address);
                const userHasSameAddress = lynkedAddressArr.lynksLocation.some(val => {
                    const formatAddress = addressFormatter(val.address);
                    return formatAddress === formatAddressInput
                });
                const duplicateAddressExists = lynksAddress.map(addresses => addresses.address).indexOf(address);
                // const userIdIsInAddress = lynksAddress.map(address => address.users.indexOf(id) === -1) === false;
                // console.log(userIdIsInAddress)
               if(userHasSameAddress) {
                    res.status(500).send("location already exists"); 
                } else if(duplicateAddressExists !== -1 && !userHasSameAddress) {
                   await LynksAddress.findOneAndUpdate({id: lynksAddress[duplicateAddressExists]._id}, { $push: { users: id }}, { new: true });
                   const dbUser = await User.findOneAndUpdate({_id: id}, { $push: { lynksLocation: lynksAddress[duplicateAddressExists]._id }}, { new: true });
                   res.status(200).json(dbUser);
                }
                else {
                   const { id: locationId } = await LynksAddress.create(req.body);
                   await LynksAddress.findOneAndUpdate({_id: locationId}, { $push: { users: id }}, { new: true });
                   const dbUser = await User.findOneAndUpdate({_id: id}, { $push: { lynksLocation: locationId }}, { new: true });
                   res.status(200).json(dbUser);
               }
            } else {
                res.status(500).send("You reached the max saved locations allowed");
            }
        } catch(err) {
            console.log(err)
            return res.status(500).send("Internal Server Error");
        };
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
};