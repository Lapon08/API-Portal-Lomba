const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    }
});

const Category = mongoose.model('Category', categorySchema);

function validatecategories(category) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(100).required()
    })
    return schema.validate(category);
}
module.exports.Category = Category;
module.exports.validate = validatecategories;
module.exports.categorySchema = categorySchema;