const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 100


    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function (params) {
    const token = jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin
    }, config.get('jwtPrivateKey'));
    return token;
}
const User = mongoose.model('User', userSchema);

function validateusers(user) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().max(100).required(),
        password: Joi.string().min(3).max(100).required()
    })
    return schema.validate(user);
}
module.exports.User = User;
module.exports.validate = validateusers;