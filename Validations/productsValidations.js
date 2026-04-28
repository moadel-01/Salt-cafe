const joi = require("joi");

const productValidation = joi.object({
  name: joi.string().min(3).required(),
  price: joi.number().min(0).required(),

  description: joi.string().required(),

  category: joi.string().required().valid("Drinks", "Food", "Desserts"),

  available: joi.boolean().default(true),

  orderCount: joi.number().default(0),
});

const updateProductValidation = joi.object({
  name: joi.string().min(3),
  price: joi.number().min(0),

  description: joi.string(),

  category: joi.string().valid("Drinks", "Food", "Desserts"),

  available: joi.boolean(),

  orderCount: joi.number(),
});

module.exports = { productValidation, updateProductValidation };
