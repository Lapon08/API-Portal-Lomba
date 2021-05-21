const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
    User
} = require('../models/user');

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        let message = "";
        for (let index = 0; index < error.details.length; index++) {
            message += error.details[index].message + ". ";
        }
        res.status(400).send(message);
        return;
    }
    let user = await User.findOne({
        email: req.body.email
    });
    if (!user) {
        return res.status(400).send('Invalid email or password');
    }

    const validpassword = await bcrypt.compare(req.body.password, user.password);
    if (!validpassword) {
        return res.status(400).send('Invalid email or password');
    }
    const token = user.generateAuthToken();

    res.send({
        "x-auth-token": token
    });
})

function validate(user) {
    const schema = Joi.object().keys({
        email: Joi.string().max(100).required(),
        password: Joi.string().min(3).max(100).required()
    })
    return schema.validate(user);
}

module.exports = router;