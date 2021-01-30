const mongoose = require("mongoose");
const { Schema } = mongoose;

const lynksAddressSchema = new Schema({
  address: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const LynksAddress = mongoose.model("LynksAddress", lynksAddressSchema);

module.exports = LynksAddress;
