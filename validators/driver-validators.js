import Joi from "joi";

export const driverRegisterValidator = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
  licenseNumber: Joi.string().alphanum().min(5).max(20).required(),
  vehicleNumber: Joi.string().pattern(/^[A-Z0-9\-]{5,15}$/).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

export const driverLoginValidator = Joi.object({
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
});

export const updateDriverValidator = Joi.object({
  fullName: Joi.string().optional(),
  licenseNumber: Joi.string().optional(),
  vehicleNumber: Joi.string().optional(),
});