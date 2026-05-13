const { get } = require("mongoose");
const { Order } = require("../Models/order");

async function createOrder(req, res) {
  try {
    const cashier = {
      cashier_id: req.user.id,
      name: req.user.username,
      role: req.user.role,
    };

    const {
      orderProducts,
      customer_name,
      order_status,
      total_price,
      order_type,
      delivery_address,
      table_number,
    } = req.body;

    const order = await Order.create({
      cashier: cashier,
      customer_name: customer_name,
      order_status: order_status,

      products: orderProducts.map((item) => ({
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),

      total_price: total_price,

      order_type: order_type,

      delivery_address: delivery_address,

      table_number: table_number,
    });

    res.status(200).json({ message: "order created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

getOrders = async (req, res) => {
  try {
    const { sorting = -1, order_type, order_status } = req.query;

    const query = {};

    if (order_type) {
      query.order_type = order_type;
    }

    if (order_status) {
      query.order_status = order_status;
    }

    const orders = await Order.find(query).sort({ sorting });
    const total = await orders.length;
    res.status(200).json({ message: "all orders", data: { total, orders } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

async function getSingleOrder(req, res) {
  try {
    const { id } = req.params;

    const orderExist = await Order.findById(id);
    if (!orderExist) {
      return res.status(404).json({ message: "order not found" });
    }

    res.status(200).json({ message: "order found", data: orderExist });
  } catch (error) {
    res.status(500).json({ message: "Invalid ID" });
  }
}

async function getAllUserOrders(req, res) {}

async function search(req, res) {}

module.exports = { createOrder, getOrders, getSingleOrder };
