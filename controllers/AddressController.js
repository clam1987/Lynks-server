const db = require("../models");
const { User, LynksAddress } = db;
const { addressFormatter } = require("../utils/util");

module.exports = {
    submitAddress: async (req, res) => {
        try {
            const { id } = req.params;
            const { address } = req.body
            const lynkedAddressArr = await User.findById(id).populate("lynksLocation");
            if(lynkedAddressArr.lynksLocation.length <= lynkedAddressArr.maxAvailableLocations) {
                const formatAddressInput = addressFormatter(address);
                const doesAddressExist = lynkedAddressArr.lynksLocation.some(val => {
                    const formatAddress = addressFormatter(val.address);
                    return formatAddress === formatAddressInput
                });
               if(doesAddressExist) {
                   res.status(500).send("location already exists");
                } else {
                   const { id: userId } = await LynksAddress.create(req.body);
                   const dbUser = await User.findOneAndUpdate({_id: id}, { $push: { lynksLocation: userId }}, { new: true });
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
            const data = await LynksAddress.find()
            return res.status(200).json(data);
        } catch(err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }
    },
};