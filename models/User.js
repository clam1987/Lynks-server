const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  age: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String,
    }
  ],
  password: {
    type: String,
    trim: true,
    required: true,
    validate: [({ length }) => length >= 6, "Password should be longer."],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  lynksLocation: [
    {
      type: Schema.Types.ObjectId,
      ref: "LynksAddress", 
    }
  ],
  likedUsers: [
   {
      type: Schema.Types.ObjectId,
      ref: "LikedUsers",
   }
  ],
  maxAvailableLocations: {
    type: Number,
    default: 10
  }
});

userSchema.pre("save", function () {
  if (!this.isModified("password")) {
    return Promise.resolve();
  }
  if (this.password.length < 6) {
    return Promise.reject(
      new Error("Password must have at least 6 characters")
    );
  }
  return bcrypt.hash(this.password, SALT_ROUNDS).then(hash => {
    this.password = hash;
  });
});

userSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
