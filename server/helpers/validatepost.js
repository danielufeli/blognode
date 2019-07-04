import Joi from '@hapi/joi';

const validatePost = {
  title: Joi.string().min(2).max(200).required(),
  descriptions: Joi.string().min(2).max(1000).required(),
  category: Joi.string().min(6).max(255).required(),
  tag: Joi.string().min(4).max(255).required(),
};

export default validatePost;
