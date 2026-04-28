const { get } = require("mongoose");
const { Order } = require("../Models/order");

async function createOrder(req, res) {
  try {
    const cashier = {
      cashier_id: req.user.id,
      name: req.user.username,
      role: req.user.role,
    };

    const { orderProducts, customer_name, order_status, total_price } =
      req.body;

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
    });

    res.status(200).json({ message: "order created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
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

async function getAllUserOrders(req, res) {
    
}

async function search(req, res) {
    
}

module.exports = { createOrder, getOrders, getSingleOrder };
