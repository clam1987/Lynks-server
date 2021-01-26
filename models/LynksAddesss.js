const mongoose = require("mongoose");
const { Schema } = mongoose;

const lynksAddressSchema = new Schema({
  address: {
    type: String,
  },
  lat: {
    type: Number,
  },
  long: {
    type: Number,
  }
});

const LynksAddress = mongoose.model("LynksAddress", lynksAddressSchema);

module.exports = LynksAddress;
