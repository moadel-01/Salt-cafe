const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, minlenght: 3 },
    price: { type: Number, required: true, min: 0 },

    description: { type: String, required: true },

    category: {
      type: String,
      required: true,
      enum: ["Drinks", "Food", "Desserts"],
    },

    thumbnail: { type: String, required: true },
    available: { type: Boolean, default: true },

    orderCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
