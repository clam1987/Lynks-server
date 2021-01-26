const mongoose = require("mongoose");
const { Schema } = mongoose;

const likedUsersSchema = new Schema({
  liked: {
    type: Boolean,
  },
  accountId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
});


const LikedUsers = mongoose.model("LikedUsers", likedUsersSchema);

module.exports = LikedUsers;
