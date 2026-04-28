const orderController = require("../Controllers/ordersController");
const authMidd = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const orderRouter = require("express").Router();

orderRouter.post(
  "/",
  authMidd,
  roleMiddleware("ADMIN", "MANAGER"),
  orderController.createOrder,
);

orderRouter.get("/", orderController.getOrders);
orderRouter.get("/:id", orderController.getSingleOrder);

module.exports = orderRouter;
