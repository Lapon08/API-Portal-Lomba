const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const {
    categorySchema
} = require('./category');
const competitionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    category: {
        type: categorySchema,
        required: true
    },
    organizer: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    competition_site: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    prices: [{
        price: {
            type: Number,
            required: true
        },
        start_date: {
            type: Number,
            required: true
        },
        end_date: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100
        }
    }],
    schedule: [{
        start_date: {
            type: Number,
            required: true
        },
        end_date: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100
        }
    }]
});

const Competition = mongoose.model('Competition', competitionSchema);

function validatecompetitions(competition) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(100).required(),
        categoryId: Joi.objectId().required(),
        organizer: Joi.string().min(3).max(100).required(),
        competition_site: Joi.string().min(3).max(100).required(),
        prices: Joi.array().items(Joi.object().keys({
            price: Joi.number().required(),
            description: Joi.string().min(3).max(100).required(),
            end_date: Joi.number().integer().required(),
            start_date: Joi.number().integer().required()
        })).required(),
        schedule: Joi.array().items(Joi.object().keys({
            description: Joi.string().min(3).max(100).required(),
            end_date: Joi.number().integer().required(),
            start_date: Joi.number().integer().required()
        })).required()
    });
    return schema.validate(competition, {
        abortEarly: false
    });
}

module.exports.Competition = Competition;
module.exports.validate = validatecompetitions;