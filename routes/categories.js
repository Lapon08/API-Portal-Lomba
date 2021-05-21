const {
    Category,
    validate
} = require('../models/category');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/admin');

router.get('/', auth, async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
})

router.get('/:id', auth, async (req, res) => {
    const categories = await Category.findById(req.params.id);
    if (!categories) {
        res.status(404).send("The category with the given ID was not found");
        return;
    }

    res.send(categories);
})

router.delete('/:id', auth, isAdmin, async (req, res) => {
    const categories = await Category.findByIdAndRemove(req.params.id);
    if (!categories) {
        res.status(404).send('The category with the given ID was not found');
        return;
    }
    res.send(categories);
})

router.post('/', auth, isAdmin, async (req, res) => {
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
    let validatecategory = await Category.findOne({
        name: req.body.name
    });
    if (validatecategory) {
        return res.status(400).send('Category already registered');
    }
    const category = new Category({
        name: req.body.name
    });

    const categories = await category.save();
    res.send(categories);
})

router.put('/:id', auth, isAdmin, async (req, res) => {

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

    let validatecategory = await Category.findOne({
        name: req.body.name
    });
    if (validatecategory) {
        return res.status(400).send('Category already registered');
    }

    const category = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {
        new: true
    })
    if (!category) {
        res.status(404).send('The category with the given ID was not found');
        return;
    } else {
        res.send(category);
    }

})

module.exports = router;