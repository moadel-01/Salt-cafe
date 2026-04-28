const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const { error } = require("node:console");
const userRouter = require("./Routes/users.Routes");
const { prodRouter } = require("./Routes/products.Routes");
const orderRouter = require("./Routes/orders.Routes");

const app = express();
app.use(express.json());

app.use("/users", userRouter);

app.use("/products", prodRouter);

app.use("/orders", orderRouter);



mongoose
  .connect(process.env.CONN_STRING)
  .then(() => console.log("mongo CONNECTED..."))
  .catch((error) => console.log(error));

app.listen(process.env.PORT, () => {
  console.log("Server is RUNNING...");
});
