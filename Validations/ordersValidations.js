const joi = require("joi");

const updateOrderValidations = joi.object({
  order_status: joi
    .string()
    .valid("Pending", "Preparing", "Ready", "Completed"),

  order_type: joi.string().valid("Dine-in", "Takeaway", "Delivery"),
});

module.exports = { updateOrderValidations };
