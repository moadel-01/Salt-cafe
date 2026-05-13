const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    customer_name: { type: String, minlength: 3, default: "Customer" },
    order_type: {
      type: String,
      enum: ["Dine-in", "Takeaway", "Delivery"],
      required: true,
    },

    delivery_address: {
      street: { type: String },
      building_number: { type: String },
    },

    table_number: {
      type: Number,
    },

    order_status: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Completed"],
      default: "Pending",
    },

    cashier: {
      cashier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: { type: String },
      role: { type: String },
    },

    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String },
        price: { type: String },
        quantity: { type: String },
      },
    ],

    total_price: { type: Number, required: true },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
