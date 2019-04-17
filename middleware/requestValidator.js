const Joi = require('joi');

module.exports = schema => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema);

    if (error)
      return res.status(400).json({
        error: error.details[0].message
      });

    next();
  };
};
