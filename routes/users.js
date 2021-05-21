const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const {
    User,
    validate
} = require('../models/user');

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

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
    let validateemail = await User.findOne({
        email: req.body.email
    });
    if (validateemail) {
        return res.status(400).send('User already registered');
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({
        name: req.body.name,
        email: req.body.email
    });
})
module.exports = router;