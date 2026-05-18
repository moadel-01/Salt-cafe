const { get } = require("mongoose");
const { Order } = require("../Models/order");
const { updateOrderValidations } = require("../Validations/ordersValidations");

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

      delivery: {
        address: { street, building_number } = {},
        delivery_fees,
        customer_number,
      } = {},

      table: { table_number, service_fees } = {},
    } = req.body;

    const order = await Order.create({
      cashier,
      customer_name,
      customer_number,
      order_status,

      products: orderProducts.map((item) => ({
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),

      total_price,

      order_type,

      delivery: {
        address: {
          street,
          building_number,
        },
        delivery_fees,
        customer_number,
      },

      table: {
        table_number,
        service_fees,
      },
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

async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;

    const { error, value } = updateOrderValidations.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const order = await Order.findByIdAndUpdate(id, value);

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    res.status(200).json({ message: `order Updated` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

async function getTodayOrders(req, res) {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 1);

    const orders = await Order.find({
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const total = await orders.length;

    res
      .status(200)
      .json({ message: "all orders made today", data: { total, orders } });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createOrder,
  getOrders,
  getSingleOrder,
  getTodayOrders,
  updateOrderStatus,
};
