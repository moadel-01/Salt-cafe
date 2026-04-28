const joi = require("joi");

const userValidation = joi.object({
  username: joi.string().min(3).required(),
  password: joi.string().min(3).required(),

  role: joi.string().valid("MANAGER", "ADMIN", "CASHIER", "CHEIF"),
});

const updateValidation = joi.object({
  username: joi.string().min(3),
  password: joi.string().min(3),

  role: joi.string().valid("MANAGER", "ADMIN", "CASHIER", "CHEIF"),
});

const loginValidation = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
})

module.exports = { userValidation, updateValidation, loginValidation };
