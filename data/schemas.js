const Joi = require('joi');

const userSchema = {
  username: Joi.string()
    .label('Username')
    .alphanum()
    .min(3)
    .max(255)
    .required(),
  password: Joi.string()
    .label('Password')
    .min(6)
    .required(),
  email: Joi.string()
    .label('Email address')
    .email({ minDomainAtoms: 2 })
    .required(),
  first_name: Joi.string()
    .label('First name')
    .required(),
  last_name: Joi.string()
    .label('Last name')
    .required(),
  title: Joi.string().label('Title')
};

const storySchema = {
  title: Joi.string().required(),
  country: Joi.string().required(),
  description: Joi.string().required()
};

module.exports = {
  userSchema,
  storySchema
};
