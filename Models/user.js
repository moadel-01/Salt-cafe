const mongoose = require("mongoose");
const { type } = require("node:os");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, minlength: 3 },
    password: { type: String, required: true, minlength: 8 },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "MANAGER", "CASHIER", "CHEIF"],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
