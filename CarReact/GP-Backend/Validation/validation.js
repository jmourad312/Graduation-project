const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(255).required(),
    // middelName: Joi.string().max(15),
    // phoneNumber: Joi.string().max(20),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
};
