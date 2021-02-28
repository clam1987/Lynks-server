const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchUsersSchema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  matchUser: [
      {
          type: Schema.Types.ObjectId,
          ref: "User"
      }
  ]
});


const MatchUsers = mongoose.model("MatchedUsers", matchUsersSchema);

module.exports = MatchUsers;
