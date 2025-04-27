import Joi from 'joi';

export const rideValidationSchema = Joi.object({
  passenger: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).messages({
    'any.required': 'Passenger ID is required',
    'string.pattern.base': 'Passenger ID must be a valid ObjectId',
  }),
  driver: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).messages({
    'any.required': 'Driver ID is required',
    'string.pattern.base': 'Driver ID must be a valid ObjectId',
  }),
  origin: Joi.string().required().messages({
    'any.required': 'Origin is required',
  }),
  destination: Joi.string().required().messages({
    'any.required': 'Destination is required',
  }),
  status: Joi.string().valid('pending', 'ongoing', 'completed').default('pending').messages({
    'any.only': 'Status must be one of pending, ongoing, or completed',
  }),
});

export const validateRide = (req, res, next) => {
    const { error } = rideSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };