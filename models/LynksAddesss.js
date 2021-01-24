const mongoose = require("mongoose");
const { Schema } = mongoose;

const lynksAddressSchema = new Schema({
  address: {
    type: String
  },
});

const LynksAddress = mongoose.model("LynksAddress", lynksAddressSchema);

module.exports = LynksAddress;
