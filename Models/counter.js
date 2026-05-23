const mongoose = require("mongoose");

const counterSchema = mongoose.Schema({
  _id: { type: String },
  sequence_value: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;