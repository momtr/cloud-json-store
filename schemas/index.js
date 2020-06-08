const Joi = require('joi');

const schema_get_data = Joi.object({
    name: Joi.string().alphanum().min(1).max(100).required(),
    key: Joi.string().length(36)
});

const schema_post_data = Joi.object({
    name: Joi.string().alphanum().min(1).max(100).required(),
    data: Joi.object().required()
});

module.exports = { schema_get_data, schema_post_data };