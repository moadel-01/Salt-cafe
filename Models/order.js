const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    customer_name: { type: String, minlength: 3, default: "Customer" },

    order_type: {
      type: String,
      enum: ["Dine-in", "Takeaway", "Delivery"],
      required: true,
    },

    delivery: {
      address: {
        street: { type: String },
        building_number: { type: String },
      },
      delivery_fees: { type: Number },
      customer_number: { type: String, minlength: 11, default: "No No. Found" },
    },

    table: {
      table_number: { type: Number },
      service_fees: { type: Number },
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
        price: { type: Number },
        quantity: { type: Number },
      },
    ],

    total_price: { type: Number, required: true },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
