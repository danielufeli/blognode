import Joi from '@hapi/joi';

const validateUser = {
  firstname: Joi.string().min(2).max(50).required(),
  lastname: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(4).max(255).required()
    .email(),
  address: Joi.string().min(6),
  status: Joi.string().min(6),
  mobileno: Joi.number().min(10).required(),
  isadmin: Joi.boolean(),
};

export default validateUser;
