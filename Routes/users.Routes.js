const userController = require("../Controllers/usersController");
const express = require("express");
const roleMiddleware = require("../middlewares/roleMiddleware");
const authMidd = require("../middlewares/authMiddleware");
const userRouter = express.Router();

userRouter.post(
  "/createUser",
  authMidd,
  roleMiddleware("ADMIN"),
  userController.createUser,
);

userRouter.get(
  "/",
  authMidd,
  roleMiddleware("ADMIN", "MANAGER"),
  userController.getAllUsers,
);
userRouter.get("/:id", userController.getSingleUser);

userRouter.delete(
  "/:id",
  authMidd,
  roleMiddleware("ADMIN"),
  userController.deleteUser,
);

userRouter.patch(
  "/:id",
  authMidd,
  roleMiddleware("ADMIN"),
  userController.updateUser,
);

userRouter.post("/login", userController.login);

module.exports = userRouter;
